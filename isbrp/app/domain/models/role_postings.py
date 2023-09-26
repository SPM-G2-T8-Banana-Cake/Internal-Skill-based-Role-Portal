from dataclasses import dataclass

@dataclass
class RolePostingDetails:
    Role_Name: str
    Skill_Name: str
    
@dataclass
class RoleDetails:
    Role_Name: str
    Role_Desc: str