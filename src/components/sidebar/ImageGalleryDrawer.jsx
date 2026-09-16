import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { CURATED_IMAGES } from '../../data/assetsLibrary';
import { X, Image as ImageIcon, Plus, Upload, Link2 } from 'lucide-react';

export const ImageGalleryDrawer = ({ isOpen, onClose }) => {
  const { addImageElement } = useCanvas();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customUrl, setCustomUrl] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Fashion & Atelier', 'Architecture & Space', 'Jewelry & Objects', 'Perfumery & Botanicals', 'Textures & Surfaces'];

  const filteredImages = selectedCategory === 'All'
    ? CURATED_IMAGES
    : CURATED_IMAGES.filter(img => img.category === selectedCategory);

  const handleSelectImage = (img) => {
    addImageElement(img.url, img.title);
    onClose();
  };

  const handleAddCustomUrl = (e) => {
    e.preventDefault();
    if (customUrl.trim()) {
      addImageElement(customUrl.trim(), 'Custom Image');
      setCustomUrl('');
      onClose();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addImageElement(event.target.result, file.name);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-96 bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ImageIcon className="w-4 h-4 text-[#c5a059]" />
          <div>
            <h2 className="font-serif text-sm font-semibold text-white">
              Curated Editorial Image Gallery
            </h2>
            <span className="font-mono text-[9px] text-[#c5a059]">
              {CURATED_IMAGES.length} Curated Luxury Assets
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Upload or Custom URL input */}
      <div className="p-3.5 border-b border-[#262a34] bg-[#15181f] space-y-2">
        <form onSubmit={handleAddCustomUrl} className="flex items-center space-x-1.5">
          <div className="relative flex-1">
            <Link2 className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Paste any Image URL..."
              className="w-full bg-[#0d0f13] border border-[#2c303c] text-xs text-white rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#c5a059] text-black font-semibold text-xs rounded-lg hover:bg-[#e4c88a] transition"
          >
            Add
          </button>
        </form>

        <label className="flex items-center justify-center space-x-2 py-2 border border-dashed border-[#313644] hover:border-[#c5a059] rounded-lg cursor-pointer bg-[#0e1014] text-gray-300 hover:text-white text-xs transition">
          <Upload className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Upload From Computer</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Category Pills */}
      <div className="p-3 border-b border-[#262a34] flex items-center space-x-1.5 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-sans whitespace-nowrap border transition ${
              selectedCategory === cat
                ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                : 'bg-[#181a22] border-[#292e3a] text-gray-400 hover:text-white'
            }`}
          >
            {cat.split('&')[0]}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => handleSelectImage(img)}
            className="group relative rounded-xl border border-[#2b303d] hover:border-[#c5a059] overflow-hidden bg-[#161820] cursor-pointer transition shadow-sm"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-2 bg-[#121419]/95 border-t border-white/5">
              <span className="text-[10px] text-white font-serif block truncate">
                {img.title}
              </span>
              <span className="text-[9px] font-mono text-gray-400 block truncate">
                {img.category.split('&')[0]}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <span className="px-2.5 py-1 bg-[#c5a059] text-black text-[10px] font-semibold rounded shadow-md flex items-center space-x-1">
                <Plus className="w-3 h-3" />
                <span>Add to Canvas</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
