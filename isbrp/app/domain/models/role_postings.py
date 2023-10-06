from dataclasses import dataclass

@dataclass
class RolePostingDetails:
    Role_Name: str
    Skill_Name: str
    
@dataclass
class RoleDetails:
    Role_Name: str
    Role_Desc: str


@dataclass
class StaffData:
    Staff_ID: int
    Staff_FName: str
    Staff_LName: str
    Dept: str
    Country: str
    Email: str
    Access_Rights: int

@dataclass
class StaffSkill:
    Staff_ID: int
    Skill_Name: str
