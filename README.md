# PodKast: Your Podcast Social Media Platform

PodKast is a sophisticated social media platform designed exclusively for podcast enthusiasts. It offers a seamless user experience for discovering, sharing, and engaging with your favorite podcasts and connecting with fellow enthusiasts.

## Features

- **Discover Podcasts**: Explore a vast library of podcasts across various genres and topics.
- **Personalized Feed**: Receive personalized recommendations based on your listening history and preferences.
- **Engagement**: Like, comment, and share episodes with your friends and followers.
- **Community Interaction**: Participate in discussions, join clubs, and follow your favorite podcast hosts.
- **Secure Authentication**: Utilizes JWT-based authentication for secure login and user sessions.
- **Responsive Design**: Enjoy a consistent experience across devices with a responsive and intuitive design.

## Technologies Used

- **Frontend**: Developed using React.js for a dynamic and interactive user interface.
- **Backend**: Powered by Node.js and Express.js for efficient server-side logic and API development.
- **Database**: MongoDB provides a scalable and flexible database solution for storing user data and podcast information.
- **Authentication**: JWT tokens ensure secure authentication and authorization for user sessions.
- **Cloud Integration**: Utilizes Firebase Storage for secure cloud storage of podcast audio files.
- **Deployment**: Deployed on Render for backend services and Netlify Hosting for frontend deployment.

## Deployed Link:
[Link to Website](https://podkasts.netlify.app/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/S51_Prasanth_Capstone_PodKast.git
    ```

2. Install dependencies:

    ```bash
    cd S51_Prasanth_Capstone_PodKast
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    FIREBASE_API_KEY=your_firebase_api_key
    
    and more...
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to access PodKast.

## Contributing

We welcome contributions from the community! If you'd like to contribute to PodKast, please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact us at [jprasanth2006@gmail.com](mailto:contact@podkast.com).
