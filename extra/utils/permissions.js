const permissions = {
    'getUsers'  : {
             all    : ['head-trainer'],
             read   : ['trainee', 'trainer'],
             write  : ['trainer'],
             delete : [],
             }
            }

    console.log(hasPermission('getUsers','head-trainer','delete'));

    function hasPermission(moduleName,role,permissionType)
    {
        if(moduleName in permissions)
        { 
            if(permissionType in permissions[moduleName])
            {
                if(permissions[moduleName][permissionType].includes(role))
                {
                    return true;
                }
                else if(permissions[moduleName].all.includes(role))
                {
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
  