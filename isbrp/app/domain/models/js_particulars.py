from dataclasses import dataclass


@dataclass
class JsParticularsAddressDetails:
    postalCode: str
    address: str
    unitNumber: str

@dataclass
class JsParticularsDetails:
    nricMasked: str
    name: str
    email: str
    registrationDate: str
    nationality: str
    gender: str
    dateOfBirth: str
    addressDetails: JsParticularsAddressDetails
    education: str
    phoneNumber: str
    desiredIndustry: list
    desiredRoles: list
    desiredSalaryPerMonth: int
    languagesSpoken: list
    locationOfWorkplace: list
    fullTimePartTime: list
    canWorkWeekends: bool
    canWorkPH:bool
    anyHealthIssues: str
    criminalRecord: str
    otherRemarks: str
    caseStatus: str
    reason: str
    listOfRecommendedCompanies: list

@dataclass
class JsResumeInfo:
    educationLevel: list # /
    listOfQualificationsCertifications: list # /
    workExperience: int # /
    listOfPreviousJobs: list # /
    listOfReferences: list # /
    expectedSalary: int # /
    availableDaysToWorkPerWeek: int # /


@dataclass
class JsParticulars:
    jsID: str # /
    particulars: JsParticularsDetails # /
    resumeInfo: JsResumeInfo # /



    