import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  Modal,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { fetchCompaniesWithUsers, startKYB, updateUserRole, addUserToCompany, createEntity } from '../../api/entityApi'; // Import API
import { fetchRoles } from '../../api/roleApi';
import { EntityWithUsers } from '../../types/Company';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const EntitySettings: React.FC = () => {
  const [entitiesWithUsers, setEntitiesWithUsers] = useState<EntityWithUsers[]>([]);
  const [newUserEmail, setNewUserEmail] = useState(''); // For adding new users
  const [availableRoles, setAvailableRoles] = useState<string[]>([]); // For storing roles fetched from the backend
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [newEntity, setNewEntity] = useState({
    name: '',
    address: '',
    registrationNumber: '',
    industry: '',
  }); // State for new entity
  const email = getDecryptedData('email');

  useEffect(() => {
    const fetchEntitiesData = async () => {
      const entitiesData = await fetchCompaniesWithUsers(email);
      setEntitiesWithUsers(entitiesData);
    };

    const fetchRolesData = async () => {
      const rolesData = await fetchRoles(); // Fetch roles from backend
      setAvailableRoles(rolesData.map((role: any) => role.name)); // Store role names in the availableRoles state
    };

    fetchEntitiesData();
    fetchRolesData(); // Fetch roles when component mounts
  }, [email, newEntity]);

  const handleRoleChange = async (entityId: number, userId: number, newRole: string) => {
    await updateUserRole(entityId, userId, newRole);
    const updatedEntities = entitiesWithUsers.map((entity) =>
      entity.entityId === entityId
        ? {
            ...entity,
            associatedUsers: entity.associatedUsers.map((user) =>
              user.userId === userId ? { ...user, userRole: newRole } : user
            ),
          }
        : entity
    );
    setEntitiesWithUsers(updatedEntities);
  };

  const handleAddUser = async (entityId: number) => {
    if (newUserEmail.trim()) {
      const response = await addUserToCompany(entityId, newUserEmail);
      if (response && response.success) {
        // Optionally handle adding the user to the frontend list
      }
      setNewUserEmail('');
    }
  };

  const handleModalOpen = () => setIsModalOpen(true); // Open modal
  const handleModalClose = () => setIsModalOpen(false); // Close modal

  const handleCreateEntity = async () => {
    const response = await createEntity(newEntity,email);
    if (response) {
      // Optionally update entity list after creation
      const updatedEntitiesData = await fetchCompaniesWithUsers(email);
      setEntitiesWithUsers(updatedEntitiesData);
      setIsModalOpen(false); // Close modal after success
      setNewEntity({ name: '', address: '', registrationNumber: '', industry: '' }); // Reset form
    }
  };

  return (
    <>
    
<Grid container spacing={3} sx={{ justifyContent: 'flex-end', mb: 2 }}>
  <Grid item>
    <Button variant="contained" color="primary" onClick={handleModalOpen}>
      Create New Entity
    </Button>
  </Grid>

  {entitiesWithUsers.map((entityWithUsers) => (
  <Grid item xs={12} key={entityWithUsers.entityId}>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{entityWithUsers.entityName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> {entityWithUsers.entityAddress}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Registration Number:</strong> {entityWithUsers.entityRegistrationNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Your Role:</strong> {entityWithUsers.role?.replace('ROLE_', '') || 'No Role Assigned'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {entityWithUsers.associatedUsers.map((user) => (
            <Box key={user.userId} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="body2">
                {user.userName} - {user.roleName?.replace('ROLE_', '') || 'No Role'}
              </Typography>
              {entityWithUsers.role === 'ROLE_ADMIN' && (
                <TextField
                  select
                  value={user.roleName}
                  onChange={(e) => handleRoleChange(entityWithUsers.entityId, user.userId, e.target.value)}
                  label="Change Role"
                  size="small"
                  sx={{ minWidth: 150 }}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.replace('ROLE_', '')}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Box>
          ))}

          {entityWithUsers.role === 'ROLE_ADMIN' && (
            <Box display="flex" alignItems="center" mt={2}>
              <TextField
                label="User Email"
                variant="outlined"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                size="small"
                sx={{ mr: 2, minWidth: '250px' }}
              />
              <IconButton color="primary" onClick={() => handleAddUser(entityWithUsers.entityId)}>
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  </Grid>
))}
      </Grid>

      {/* Modal for Creating New Entity */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Create New Entity
    </Typography>
    <TextField
      label="Name"
      value={newEntity.name}
      onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Address"
      value={newEntity.address}
      onChange={(e) => setNewEntity({ ...newEntity, address: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Registration Number"
      value={newEntity.registrationNumber}
      onChange={(e) => setNewEntity({ ...newEntity, registrationNumber: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Industry"
      value={newEntity.industry}
      onChange={(e) => setNewEntity({ ...newEntity, industry: e.target.value })}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleCreateEntity} sx={{ mt: 2 }}>
      Create Entity
    </Button>
  </Box>
</Modal>
    </>
  );
};

export default EntitySettings;