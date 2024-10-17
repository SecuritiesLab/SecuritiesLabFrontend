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
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { fetchCompaniesWithUsers, startKYB, updateUserRole, addUserToCompany } from '../../api/entityApi'; // Import fetchRoles API
import { fetchRoles } from '../../api/roleApi';
import { EntityWithUsers } from '../../types/Company';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const EntitySettings: React.FC = () => {
  const [entitiesWithUsers, setEntitiesWithUsers] = useState<EntityWithUsers[]>([]);
  const [newUserEmail, setNewUserEmail] = useState(''); // For adding new users
  const [availableRoles, setAvailableRoles] = useState<string[]>([]); // For storing roles fetched from the backend
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
  }, [email]);

  const handleRoleChange = async (entityId: number, userId: number, newRole: string) => {
    await updateUserRole(entityId, userId, newRole);
    const updatedEntities = entitiesWithUsers.map((entity) =>
      entity.entityId === entityId
        ? {
            ...entity,
            associatedUsers: entity.associatedUsers.map((user) =>
              user.userId === userId ? { ...user, userRole: newRole } : user
            )
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

  return (
    <Grid container spacing={3}>
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
                  <strong>Your Role:</strong> {entityWithUsers.role.replace('ROLE_', '')}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {entityWithUsers.associatedUsers.map((user) => (
                  <Box
                    key={user.userId}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography variant="body2">
                      {user.userName} - {user.roleName.replace('ROLE_', '')}
                    </Typography>
                    {entityWithUsers.role === "ROLE_ADMIN" &&
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
}
                  </Box>
                ))}

                {entityWithUsers.role === "ROLE_ADMIN" &&
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
}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default EntitySettings;