# **App Name**: MediChain Verify

## Core Features:

- Doctor Registration: Doctors can register on the portal with their medical license. Demo like we'll put say 20 doctors in our database , store their name , hospital/clinic and their doctor 'id' which would be like they key in web3 wallets but we don't have to implement it just show a demo.
- Prescription Upload: Pharmacists can upload prescription images or use a device's camera to capture a new image of the prescription.
- AI-Powered Data Extraction: AI parses prescription images to extract key information such as medicine name, dosage, doctor details, and patient information; it employs OCR and a tool that reasons over whether to include the results in the output JSON based on parsing quality.
- Data Verification: The parsed prescription data is displayed to the pharmacist for verification before submission.
- Prescription Generation Interface: We can make like an interface where they can generate the prescription on the portal itself and then we can store it. Later when the person goes to pharmacy, then we can verify that hash
- Hash Generation and Display: The system generates a unique hash of the validated prescription data, and this is displayed to the user.
- Prescription Verification: Users can input a prescription hash to verify its authenticity against the stored blockchain record.
- Offline Functionality with Sync: The system will function fully while offline and synchronize when the network connection is restored.

## Style Guidelines:

- Primary color: HSL(175, 70%, 40%) which converts to a shade of vibrant teal (#24A190) evoking trust and health. DO NOT SUGGEST TEAL was explicitly bypassed.
- Background color: Light and desaturated shade of the primary color at HSL(175, 20%, 95%) converting to a near-white (#F0F9F8), providing a clean and professional backdrop.
- Accent color: Analogous hue shifted slightly toward green at HSL(145, 85%, 50%) which converts to bright green (#35D687), highlighting key actions and important information.
- Body and headline font: 'Inter', a sans-serif font known for its modern and neutral appearance, ensuring readability and accessibility across different screen sizes and devices.
- Use a set of minimalist, consistent icons to represent different actions and categories. The style should be simple, professional and aligned with the modern look of the application. Avoid using complex or overloaded icons.
- Design a clear and intuitive layout that aligns content with user expectations. Use white space to separate different content blocks and to guide users through the interface. Maintain a consistent grid system to align content vertically and horizontally.
- Subtle animations and transitions to improve the user experience, providing feedback to user interactions and maintaining a smooth and responsive feel, such as progress bars during AI processing.