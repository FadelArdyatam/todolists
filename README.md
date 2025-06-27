# 📝 Todo List Sederhana

Aplikasi todo list sederhana yang dibangun dengan **Express.js** dan **MySQL** dengan tampilan frontend yang menarik dan responsif.



## 🚀 Instalasi & Setup

### Prerequisites
- Node.js 
- MySQL Server
- Git

## main features
- Create, read, update, delete todos
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


### Scripts
- `npm start` - Jalankan server production
- `npm run dev` - Jalankan server development dengan nodemon
- `npm test` - Jalankan tests (belum diimplementasi)

### Environment Variables
- `PORT` - Port server (default: 5000)
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - MySQL database name (default: todolist_db)

## 🚀 Deployment

### Local Development
1. Pastikan MySQL server berjalan
2. Setup environment variables
3. Jalankan `npm run dev`

### Production
1. Setup production database
2. Update environment variables
3. Jalankan `npm start`
