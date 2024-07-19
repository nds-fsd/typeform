![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721299537/Surflow_logo_2x_c29o06.png)
# Welcome to Surflow!

Surflow is a dynamic web application designed to simplify the creation and sharing of forms and surveys. Whether you're gathering feedback, conducting research, or collecting data, Surflow provides an intuitive platform to streamline your process.


## Features

-   **Dynamic Form and Survey Creation**: Effortlessly create custom forms and surveys with a user-friendly interface.
-   **Easy Sharing**: Generate shareable links to distribute your forms and surveys quickly and efficiently.
-   **Real-Time Responses**: View and analyze responses in real-time through the user dashboard.
-   **User Dashboard**: Manage your forms, track responses, and gain insights with our comprehensive dashboard.

## Getting Started

1. **Clone the repository**:

	    git clone https://github.com/yourusername/surflow.git

2. **cd surflow**:

	    cd surflow
3. **Install dependencies**:

	    npm install
4. **Start App**

	    npm run dev
    
Open your browser and navigate to `http://localhost:3000/` to use Surflow.

## Home Page

Once into [http://localhost:3000](http://localhost:3000/) you will be directed to the Homepage. If you don’t have an account yet, click the "Yes, let's do this" button, which will take you to the login page. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721375795/image_lhtmhh.png)

## Sign up & Login

1. **Access the App**: If you already have an account, simply log in with your credentials. - If you're new to Surflow, click the "Not registered? Sign Up!" link to open the registration window. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721375795/image_2_nk3r5r.png)

2. **Register Your Account**: - Fill in your name, email address, and create a secure password. - Click the "Submit" button to complete your registration. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721375794/image_4_kkdnki.png)

3.  **Welcome Email**: - After submitting your details, you will receive a welcome email from Surflow. - This email confirms that your registration was successful. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721316051/Mail_example_2x-100_n2fmck.jpg)

4.  **Access Your Workspace**: - With your registration complete, log in to Surflow and enter your workspace. - You're now ready to create your first form or survey!

## Create your first form

To create a new form, simply press the "Create New Form" button. This button will redirect you to the form editing page, where you can start adding new questions to your form. Get creative and customize your form to gather the information you need efficiently. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721375335/image_8_kvxg4i.png)

## Add new questions

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721375297/Captura_de_Pantalla_2024-07-19_a_las_9.22.54_ixiemc.png)

`When you enter the form editing page, follow these steps to create and customize your form:

1. **Set a Title**:
 - At the top right corner of the screen, you can choose a title for your form.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721377894/Screenshot_2024-07-19_at_10.30.52_AM_vi6a9e.png)

2. **Select Question Type**:
 - Choose the type of question you want to add to your form from the available options.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721377975/Screenshot_2024-07-19_at_10.32.44_AM_njvdhm.png)
3. **Add Questions**:
 - Press the "Add Question" button to add questions of the selected type to your form. To add different types of questions, simply change the question type and press "Add Question" again.

4. **Delete Questions**:
 - Use the "X" button to delete any questions you have added.

5. **Edit Questions**:
 - In the center of the screen, you'll find the editing window where you can modify the inputs for each question.

6. **Edit Specific Questions**:
 - To edit a specific question, click on the question in the left sidebar. The editing window will automatically switch to allow you to edit the selected question.

By following these steps, you can efficiently create and customize your form to suit your needs. Happy form editing!

## Save a form

Once you are happy with your form, press the "Save" button. This will add the form to your workspace, where it can be edited whenever you need. Your form will be readily available for any future modifications or updates.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721378166/Screenshot_2024-07-19_at_10.35.59_AM_vrofib.png)

## Publish & Share form

Once you have decided to publish your form and share it with the world, you can use the "Publish" button in the navbar (available when you are in the "Create New Form" window). 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721378576/Screenshot_2024-07-19_at_10.41.08_AM_pklqou.png)

If you are in your workspace, you can also publish your form directly through the dropdown menu (...) on each form card. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721378956/Screenshot_2024-07-19_at_10.48.16_AM_idzpug.png)

Both methods will open a popup with a link that you can share with the people you want to respond to your form. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721378833/Screenshot_2024-07-19_at_10.46.56_AM_unn6uw.png)

## View responses

The share link can be opened by the recipient, who will be able to answer each question one by one until they reach the last one. By pressing "Submit," their response will be saved.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721379154/Screenshot_2024-07-19_at_10.52.00_AM_szab6u.png)

To view the responses, you can use the navbar or the dropdown menu on the form cards.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721378955/Screenshot_2024-07-19_at_10.48.22_AM_cvmzxm.png)

In the "Response Page" section, you will be able to see all the responses to your forms. 

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721379153/Screenshot_2024-07-19_at_10.52.21_AM_onoqvy.png)
## Change profile data

In the "Profile" section, you can change your profile picture, update your password, or delete your account entirely. Manage your personal settings to keep your profile up-to-date and secure.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721375794/image_6_o9mzgt.png)

## Mongoose Data Schemas

This diagram shows the different Schemas and relations between entities that the app's backend uses to manage users and forms incoming data.

![enter image description here](https://res.cloudinary.com/dflb5okkq/image/upload/v1721403639/Artboard_1_2x-1004444_cu1qvi.jpg)

## Dependencies & Libraries

 - React
 - Node.js
 - Express
 - Mongoose
 - Zod
 - Tailwind CSS
 - Daisy UI
 - Cypress
 - Axios
 - Eslint
 - Prettier
 - Turbo
 - Dot env
 - JSON Web Token
 - Bcrypt
 - Docker

## Deployment Tools

- Koyeb
- Netlify
- Github 
- Github Actions

**Now you are ready to enjoy the power of Surflow!**


















