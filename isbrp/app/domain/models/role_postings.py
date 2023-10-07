from dataclasses import dataclass

@dataclass
class RoleSkillTable:
    Role_Skill_ID: str
    Role_ID: str
    Skill_Name: str
    
@dataclass
class RoleTable:
    Role_ID: str
    Role_Name: str
    Role_Desc: str


@dataclass
class StaffTable:
    Staff_ID: str
    Staff_FName: str
    Staff_LName: str
    Dept: str
    Country: str
    Email: str
    Access_Rights: int


@dataclass
class StaffSkillTable:
    Staff_Skill_ID: str
    Staff_ID: str
    Skill_Name: str


@dataclass
class RoleListingTable:
    Role_Listing_ID: str
    Role_ID: str
    Dept: str
    Application_Deadline: str


@dataclass
class RoleApplicationTable:
    Role_Listing_App_ID: str
    Role_Listing_ID: str
    Applicant_ID: str


@dataclass
class CounterTable:
    CT: int
    Staff_ID_Counter: int
    Role_ID_Counter: int
    Role_Listing_ID_Counter: int
    Staff_Skill_ID_Counter: int
    Role_Skill_ID_Counter: int
    Role_Listing_App_ID_Counter: int