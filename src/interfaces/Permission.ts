interface Permission {
    
    id?: string;
    companyId?: string;
    name?: string;
    addMemberToCompany?: boolean;
    removeMemberToCompany?: boolean;
    changePermissions?: boolean;
    addTeam?: boolean;
    removeTeam?: boolean;
    addModule?: boolean;
    removeModule?: boolean;
    editModule?: boolean;
    assertModuleToTeam?: boolean;
    assertUserToTeam?: boolean;
}

export default Permission;