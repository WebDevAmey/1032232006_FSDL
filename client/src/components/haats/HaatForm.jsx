import './HaatForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHaat } from '../../api';
import Button from '../ui/Button';

export default function HaatForm({ hostArtisanId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('/images/textile/colorful-weaving.jpg');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [category, setCategory] = useState('Other');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !coverImage || !startDate || !endDate || !location || !category) return;
    if (new Date(startDate) >= new Date(endDate)) return;
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        coverImage,
        startDate,
        endDate,
        location,
        isOnline,
        maxParticipants: Number(maxParticipants),
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        hostArtisan: hostArtisanId,
      };
      const { data } = await createHaat(payload);
      navigate(`/haats/${data.slug}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="kg-haat-form" onSubmit={onSubmit}>
      <div className="kg-haat-field">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="kg-haat-field">
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={400}
          required
        />
        <div className="kg-haat-count">{description.length}/400</div>
      </div>
      <div className="kg-haat-field">
        <label>Cover Image URL</label>
        <input value={coverImage} onChange={e => setCoverImage(e.target.value)} required />
      </div>
      <div className="kg-haat-field">
        <label>Start Date</label>
        <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      </div>
      <div className="kg-haat-field">
        <label>End Date</label>
        <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      </div>
      <div className="kg-haat-field">
        <label>Location</label>
        <input value={location} onChange={e => setLocation(e.target.value)} required />
      </div>
      <div className="kg-haat-field">
        <label>Online Event</label>
        <select value={isOnline ? 'yes' : 'no'} onChange={e => setIsOnline(e.target.value === 'yes')}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      <div className="kg-haat-field">
        <label>Max Participants</label>
        <input type="number" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} min="1" />
      </div>
      <div className="kg-haat-field">
        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Other</option>
          <option>Winter Market</option>
          <option>Open Studio</option>
          <option>Weekend Pop-up</option>
        </select>
      </div>
      <div className="kg-haat-field">
        <label>Tags (comma separated)</label>
        <input value={tags} onChange={e => setTags(e.target.value)} />
      </div>
      <Button variant="primary" size="lg" fullWidth loading={loading} type="submit">
        Create Haat
      </Button>
    </form>
  );
}
