# 👗 AI-Powered Virtual Try-On Clothing Store

Welcome to the **AI-Powered Virtual Try-On Clothing Store**! This Next.js-based website allows users to browse and purchase clothing items while leveraging AI technology to virtually try on clothes before buying. The project integrates with **Hugging Face API** for AI-powered virtual try-on and **Edge Store** for secure file storage.

---

## 🌟 Features

- **AI Virtual Try-On**: Users can upload their photos and virtually try on clothing items using AI-powered technology.
- **Product Catalog**: Browse a wide range of clothing items with detailed descriptions, images, and pricing.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Secure File Storage**: Uploaded user images are securely stored using Edge Store.
- **User-Friendly Interface**: Intuitive and easy-to-use interface for seamless shopping.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/ariesanhthu/vton-webstore.git)
   cd vton-webstore
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following keys:

   ```env
   # Hugging Face API
   HUGGING_FACE_API_KEY=your_hugging_face_api_key_here

   # Edge Store
   EDGE_STORE_SECRET_KEY=your_edge_store_secret_key_here
   EDGE_STORE_ACCESS_KEY=your_edge_store_access_key_here
   ```

   Replace the placeholders with your actual API keys.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The website will be available at `http://localhost:3000`.

---

## 🤖 How AI Virtual Try-On Works

1. **User Uploads Photo**: The user uploads a photo of themselves through the website interface.
2. **AI Processing**: The photo is sent to the Hugging Face API, which processes the image and overlays the selected clothing item.
3. **Virtual Try-On Result**: The processed image is returned to the user, allowing them to see how the clothing item looks on them.
4. **Secure Storage**: Uploaded images are securely stored using Edge Store for future reference.

---

## 🌐 Deployment

This project is optimized for deployment on **Vercel**. Follow these steps to deploy:

1. Push your code to a GitHub repository.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add the environment variables in the Vercel dashboard under **Settings > Environment Variables**.
4. Deploy!

---

## 🛠️ Troubleshooting

- **Missing Environment Variables**: Ensure all required environment variables are set in `.env.local`.
- **API Errors**: Check the Hugging Face API and Edge Store documentation for any API-related issues.
- **Image Upload Issues**: Verify that the Edge Store keys are correct and the service is operational.

---

## 👥 Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the awesome framework.
- [Hugging Face](https://huggingface.co/) for AI models.
- [Edge Store](https://edgestore.dev/) for file storage.

---

Made with ❤️ by [Anh Thu](https://github.com/ariesanhthu).
