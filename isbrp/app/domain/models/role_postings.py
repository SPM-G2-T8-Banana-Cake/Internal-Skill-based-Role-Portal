from dataclasses import dataclass
    
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
    Skills: str

@dataclass
class RoleListingTable:
    Role_Listing_ID: str
    Role_ID: str
    Dept: str
    Application_Deadline: str
    Skills: str


@dataclass
class RoleApplicationTable:
    Role_Listing_App_ID: str
    Role_Listing_ID: str
    Applicant_ID: str
    Application_Status: str


@dataclass
class CounterTable:
    CT: int
    Staff_ID_Counter: int
    Role_ID_Counter: int
    Role_Listing_ID_Counter: int
    Role_Listing_App_ID_Counter: int