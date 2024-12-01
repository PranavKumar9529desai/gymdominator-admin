# GymDominator Admin  

[![GymDominator](https://img.shields.io/badge/version-1.0.0-brightgreen)]()  
[![Next.js](https://img.shields.io/badge/Framework-Next.js-000?logo=nextdotjs)](https://nextjs.org/)  
[![Hono](https://img.shields.io/badge/Backend-Hono-yellow)](https://hono.dev/)  
[![Cloudflare Workers](https://img.shields.io/badge/Deployment-Cloudflare%20Workers-orange)](https://workers.cloudflare.com/)  
[![Prisma](https://img.shields.io/badge/Database-Prisma-blue)](https://www.prisma.io/)  

GymDominator Admin is a professional and robust web application designed to transform the way gym owners manage their business operations. This platform simplifies gym management by offering a feature-rich dashboard for administrators and trainers. It allows gym owners to oversee trainers, users, and sales operations while also providing trainers with tools to manage their assigned clients effectively.  

---

## **Features**  

### **For Gym Owners**  
- **Comprehensive Dashboard:**  
  Manage trainers, members, and sales activities with an intuitive and user-friendly interface.  

- **Trainer Management:**  
  Assign trainers to gym members and track their performance.  

- **User Management:**  
  View and manage gym member profiles, including attendance, personalized plans, and progress reports.  

- **Sales Tracking:**  
  Monitor subscription packages, membership renewals, and revenue generated.  

---

### **For Trainers**  
- **Client Management:**  
  View assigned gym members and their personalized workout and diet plans.  

- **Attendance Management:**  
  Generate unique QR codes for gym members to scan, ensuring valid entry and attendance tracking.  

- **Workout Planner:**  
  Create and assign workout routines with detailed descriptions and video guides.  

---

## **Technology Stack**  

- **Frontend:**  
  - Next.js 14 (Modern App Router)  
  - NextAuth v5 for authentication  
  - ShadCN for UI components  
  - Tailwind CSS for styling  
  - Framer Motion for animations  

- **Backend:**  
  - Built with Hono  
  - Deployed on Cloudflare Workers  

- **Database:**  
  - Cloudflare's D1 serverless database integrated with Prisma ORM  

- **Images:**  
  - Managed via Cloudinary  

---

## **Screenshots**  

### **Owner Dashboard**  
_Manage your gym with ease using the owner dashboard._  

**Owner Side Image 1**  
<img src="/app/assests/owner-1.png" alt="Owner Side Screenshot 1" width="600"/>  

**Owner Side Image 2**  
<img src="/app/assests/owner-2.png" alt="Owner Side Screenshot 2" width="600"/>  

---

### **Trainer Dashboard**  
_Empower trainers with the tools they need to manage clients effectively._  

**Trainer Side Image 1**  
<img src="/app/assests/trainer-1.png" alt="Trainer Side Screenshot 1" width="600"/>  

**Trainer Side Image 2**  
<img src="/app/assests/trainer-2.png" alt="Trainer Side Screenshot 2" width="600"/>  

---

## **How to Run Locally**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/gymdominator-admin.git
   cd gymdominator-admin
