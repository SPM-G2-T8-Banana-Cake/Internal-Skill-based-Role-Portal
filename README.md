# Internal-Skill-based-Role-Portal

<p align="center">
<img src="https://github.com/SPM-G2-T8-Banana-Cake/Internal-Skill-based-Role-Portal/assets/47893187/3617f77f-2555-4e9d-a724-774fbb1f176e" data-canonical-src="https://github.com/SPM-G2-T8-Banana-Cake/Internal-Skill-based-Role-Portal/assets/47893187/3617f77f-2555-4e9d-a724-774fbb1f176e" width="500" height="400" />
</p>
<p align="center">
All-In-One Internal Skill-based Role Portal is an internal company web application that builds upon its Learning Journey Planning System (LJPS) database. It targets the current email blast faced, by providing functionalities that eliminate the hassle of HR having to collate all the staff data and handling their applications.
</p>




## Technologies Used
### Front End Development (Core Libraries)

> Front End was developed with the React framework using javascript.

| Library   | Description                           | Link                                                         |
| --------- | ------------------------------------- | --------------------------------------                       |
| bootstrap | Styling, Tooltips                     | [Bootstrap](https://getbootstrap.com/)                       |  
| sass      | CSS extension language                | [SASS](https://sass-lang.com/)                               |
| MUI       | Component library for styling         | [MUI](https://mui.com/)                                      |
| formik    | Helps you with building forms         | [Formik](https://formik.org/docs/api/formik)                 |
| yup       | Object schema builder                 | [Yup](https://www.npmjs.com/package/yup?activeTab=readme)    |

### Back End (Core Libraries)

> Back End is coded in Python with Flask.

| Library | Description                                                | Link                             |
| ------- | ---------------------------------------------------------- | -------------------------------- |
| Python  | Micro web framework in Python                              | [Flask](https://flask.palletsprojects.com/en/3.0.x/) |
| Pytest  | Python testing framework                                   | [Pytest](https://docs.pytest.org/en/7.4.x/) |
| boto3   | Python SDK for AWS                                         | [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) |
| flask-cors    | Micro web framework in Python                        | [Flask-Cors](https://flask-cors.readthedocs.io/en/latest/) |
| pymssql | Python mySQL client library                                | [Pymmsql](https://pypi.org/project/pymysql/) |


## Getting Started with All-In-One Application
Two terminals will be needed to run the web application.

### Running the application view
In the root of the project directory, run the following commands in command prompt/powershell:
```
# From Project Root Change to Right Folder Directory

`cd isbrp`
This will bring you to the correct folder directory to run the client view.

`npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

```






### Running the Development Server
In the root of the project directory, run the following commands in the command prompt:
```
# From Project Root Change to Right Folder Directory

`cd isbrp/app`
This will bring you to the correct folder directory to run the server.

`python -m venv venv`
This will create a virtual environment for you to download all required server modules.

`cd venv/Scripts
Navigate to the right file to install all necessary server modules.

`activate`
Activate the virtual environment

`python -m pip install -r .\requirements.txt`
Install all the server modules.

`cd ../../`
Navigate back to the main server folder.

`python server.py / python3 server.py / server.py`
Depending on the installed pip version, run the above commands to run the server.

```

