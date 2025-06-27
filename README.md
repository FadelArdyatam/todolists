# 📝 Todo List Sederhana

Aplikasi todo list sederhana yang dibangun dengan **Express.js** dan **MySQL** dengan tampilan frontend yang menarik dan responsif.



## 🚀 Instalasi & Setup

### Prerequisites
- Node.js 
- MySQL Server
- Git

## main features
- Create, read, update, delete todos
- Toggle completion status
- Filter by status (All/Pending/Completed)
- Bulk delete completed items
- Responsive design

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Ambil semua todo |
| `GET` | `/:id` | Ambil todo berdasarkan ID |
| `POST` | `/` | Buat todo baru |
| `PUT` | `/:id` | Update todo |
| `PATCH` | `/:id/toggle` | Toggle status todo |
| `DELETE` | `/:id` | Hapus todo |
| `DELETE` | `/completed/all` | Hapus semua todo yang selesai |

### Response Format
```json
{
  "success": true,
  "data": [...],
  "message": "Success message",
  "count": 5
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🎨 Fitur UI/UX

### Design Features
- **Gradient Background** - Background yang menarik dengan gradient biru-ungu
- **Card Design** - Layout card dengan shadow dan border radius
- **Smooth Animations** - Animasi slide-in dan fade-in
- **Hover Effects** - Efek hover pada button dan todo items
- **Responsive Layout** - Adaptif untuk berbagai ukuran layar

### User Experience
- **Intuitive Interface** - Interface yang mudah dipahami
- **Real-time Feedback** - Pesan sukses/error yang informatif
- **Keyboard Support** - Enter key untuk menambah todo
- **Confirmation Dialogs** - Konfirmasi sebelum menghapus
- **Loading States** - Indikator loading saat memuat data

## 📁 Struktur Project

