# 📚 LibraryConnect – Government Academic Document Portal

LibraryConnect is a secure, role-based document management system designed for government academic institutions. It allows librarians and administrators to seamlessly upload, manage, categorize, and track official documents across departments, branches, and roles.

---

## 🧩 Key Features

- ✅ **Role-based access**: Admins, Regional Librarians, Branch Librarians
- 📤 **Secure file upload** with metadata and categories
- 🗂️ **Folder and document type filtering**
- 🔔 **Notification system** for received, approved, or updated documents
- 🗃️ **Trash system** with restore and auto-purge
- 📄 **Document preview** and download
- ⚙️ **Theme + settings preferences**
- 📈 **Dashboard analytics**

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React.js, TailwindCSS       |
| Backend   | Django, Django REST Framework |
| Database  | PostgreSQL                  |
| Auth      | Django Auth, Role-based     |
| Storage   | Local / AWS S3 (optional)   |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/libraryconnect.git
cd libraryconnect
2. Backend Setup
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
🌐 Live Demo (Optional)
Coming Soon: https://libraryconnect.gov.sl

🔒 Security & Compliance
LibraryConnect follows best practices for academic and government-grade systems:

Django’s built-in protection against CSRF, XSS, SQL injection

Role-based permissions for endpoints

Secure file URL generation

Trash/archive instead of hard delete

🤝 Contributing
Fork this repo

Create your feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m 'Add feature'

Push to the branch: git push origin feature/YourFeature

Create a Pull Request

🧑‍💼 Maintainers
Lead: Mattia Lavai

Organization: SLLB

📄 License
MIT License © 2025 Sierra Leone Library Board
