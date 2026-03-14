import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    tags: '',
    image: ''
  });

  const fetchBlogs = async () => {
    try {
      const data = await adminService.getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim())
    };

    try {
      if (editingBlog) {
        await adminService.updateBlog(editingBlog._id, payload);
      } else {
        await adminService.createBlog(payload);
      }
      setIsModalOpen(false);
      setEditingBlog(null);
      setFormData({ title: '', summary: '', content: '', tags: '', image: '' });
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      tags: blog.tags.join(', '),
      image: blog.image || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await adminService.deleteBlog(id);
        fetchBlogs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Blog Management</h1>
          <p className="text-gray-500 mt-1">Create and curate financial wisdom for the community.</p>
        </div>
        <Button onClick={() => { setEditingBlog(null); setFormData({ title: '', summary: '', content: '', tags: '', image: '' }); setIsModalOpen(true); }}>
          <Plus size={18} className="mr-2" /> New Post
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-text">Title</th>
              <th className="px-6 py-4 font-bold text-text">Status</th>
              <th className="px-6 py-4 font-bold text-text text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 transition-soft">
                <td className="px-6 py-4 font-medium text-text">{blog.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(blog)} className="p-2 text-gray-500 hover:text-accent transition-soft">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-500 hover:text-red-500 transition-soft">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-text">{editingBlog ? 'Edit' : 'New'} Blog Post</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-text"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <Input label="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              <Input label="Summary" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} required />
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text">Content (Markdown)</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-soft h-48"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  required
                />
              </div>
              <Input label="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
              <Input label="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              
              <div className="flex space-x-4 pt-4">
                <Button variant="outline" type="button" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="accent" type="submit" className="flex-1">{editingBlog ? 'Save Changes' : 'Publish'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
