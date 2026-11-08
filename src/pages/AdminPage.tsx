import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Code,
  Check,
  Copy,
  ExternalLink,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, CategoryType, GenderType, TagType, ProductColor } from '../types';

import heroSneaker from '../assets/images/stride_hero_sneaker_1790825406786.jpg';
import lifestyleSneaker from '../assets/images/stride_shoe_lifestyle_1790825431584.jpg';
import runningSneaker from '../assets/images/stride_shoe_running_1790825444966.jpg';
import basketballSneaker from '../assets/images/stride_shoe_basketball_1790825456365.jpg';
import trailSneaker from '../assets/images/stride_shoe_trail_1790825470925.jpg';
import sandalShoe from '../assets/images/stride_shoe_sandal_1790825480465.jpg';
import aeroRushShoe from '../assets/images/stride_shoe_aerorush_1790825491738.jpg';

import jordanObsidianShoe from '../assets/images/jordan_obsidian_high.webp';
import dunkArizonaShoe from '../assets/images/dunk_arizona_state.webp';
import nikeZoomBbShoe from '../assets/images/nike_zoom_bb.webp';
import minimalWhiteShoe from '../assets/images/minimal_white_shoe.webp';
import patentBlackShoe from '../assets/images/patent_black_sneaker.webp';
import jordanRetroShoe from '../assets/images/jordan_retro_shoe.webp';
import casualRunnerShoe from '../assets/images/casual_runner_shoe.webp';
import molecularRunnerShoe from '../assets/images/molecular_runner.webp';

const PRESET_IMAGES = [
  { label: 'Air Jordan 1 Obsidian UNC', url: jordanObsidianShoe },
  { label: 'Nike Dunk Low Arizona State', url: dunkArizonaShoe },
  { label: 'Nike Air Zoom BB NXT', url: nikeZoomBbShoe },
  { label: 'Minimalist White Court 88', url: minimalWhiteShoe },
  { label: 'Noir Gloss Patent Leather', url: patentBlackShoe },
  { label: 'Air Jordan Retro Flight', url: jordanRetroShoe },
  { label: 'Breeze Casual Runner', url: casualRunnerShoe },
  { label: 'Molecular Kinetic Spec', url: molecularRunnerShoe },
  { label: 'Aero Kinetic Volt', url: runningSneaker },
  { label: 'Velox Road Trainer', url: heroSneaker },
  { label: 'Mono Studio Leather', url: lifestyleSneaker },
  { label: 'Apex Court Lockdown', url: basketballSneaker },
  { label: 'Terra Vanguard Trail', url: trailSneaker },
  { label: 'Cloud Bio-Slide', url: sandalShoe },
  { label: 'Stealth Aero Rush', url: aeroRushShoe },
];

export const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts, showToast } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter in Admin
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    tagline: string;
    price: number;
    originalPrice?: number;
    category: CategoryType;
    gender: GenderType;
    images: string[];
    colors: ProductColor[];
    sizes: number[];
    description: string;
    features: string[];
    specs: {
      weight: string;
      drop: string;
      cushioning: string;
      terrain: string;
    };
    tags: TagType[];
    inStock: boolean;
  }>({
    id: '',
    name: '',
    tagline: '',
    price: 150,
    originalPrice: undefined,
    category: 'Running',
    gender: 'Unisex',
    images: [runningSneaker],
    colors: [{ name: 'Volt Lime', hex: '#C6F432', image: runningSneaker }],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: '',
    features: ['Proprietary KineticFoam™ Midsole', 'Zero-waste circular knit upper', 'High-abrasion carbon rubber'],
    specs: {
      weight: '210g (US M9)',
      drop: '8mm offset',
      cushioning: 'Max Responsive',
      terrain: 'Road & Pavement'
    },
    tags: ['new'],
    inStock: true
  });

  // Handle URL edit query parameter
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      const target = products.find((p) => p.id === editId);
      if (target) {
        startEditing(target);
      }
    }
  }, [searchParams, products]);

  const startCreating = () => {
    setEditingProductId(null);
    setFormData({
      id: `stride-model-${Date.now()}`,
      name: '',
      tagline: '',
      price: 160,
      originalPrice: undefined,
      category: 'Running',
      gender: 'Unisex',
      images: [runningSneaker],
      colors: [
        { name: 'Volt Lime', hex: '#C6F432', image: runningSneaker },
        { name: 'Onyx Black', hex: '#111111', image: aeroRushShoe }
      ],
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
      description: 'Engineered for high-mileage responsiveness and maximum energy return.',
      features: [
        'Proprietary KineticFoam™ 2.0 Midsole',
        'Laser-ventilated circular knit upper',
        'Contoured anatomical arch support'
      ],
      specs: {
        weight: '210g (US M9)',
        drop: '8mm offset',
        cushioning: 'Responsive Medium',
        terrain: 'Road & Track'
      },
      tags: ['new'],
      inStock: true
    });
    setIsEditorOpen(true);
  };

  const startEditing = (p: Product) => {
    setEditingProductId(p.id);
    setFormData({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      price: p.price,
      originalPrice: p.originalPrice,
      category: p.category,
      gender: p.gender,
      images: [...p.images],
      colors: p.colors.map(c => ({ ...c })),
      sizes: [...p.sizes],
      description: p.description,
      features: [...p.features],
      specs: { ...p.specs },
      tags: [...p.tags],
      inStock: p.inStock
    });
    setIsEditorOpen(true);
  };

  const handleDuplicate = (p: Product) => {
    const duplicated: Product = {
      ...p,
      id: `${p.id}-copy-${Date.now()}`,
      name: `${p.name} (Edition 2)`,
      tags: ['new']
    };
    addProduct(duplicated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const finalProduct: Product = {
      ...formData,
      rating: 4.9,
      reviewCount: 24,
      isNewArrival: formData.tags.includes('new'),
      isBestSeller: formData.tags.includes('bestseller')
    };

    if (editingProductId) {
      updateProduct(finalProduct);
    } else {
      addProduct(finalProduct);
    }

    setIsEditorOpen(false);
    setSearchParams({});
  };

  const toggleSize = (size: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size).sort((a, b) => a - b)
        : [...prev.sizes, size].sort((a, b) => a - b)
    }));
  };

  const toggleTag = (tag: TagType) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const addColorway = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: 'Chalk White', hex: '#EBEBE8', image: prev.images[0] }]
    }));
  };

  const removeColorway = (index: number) => {
    if (formData.colors.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  // Filtered list
  const filtered = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
    }
    return true;
  });

  const exportTsCode = `export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};`;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exportTsCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      showToast('Catalog TypeScript code copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-neutral-500">Live Catalog Management</span>
        </div>
      </div>

      {/* Main Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#84ad00] dark:text-[#C6F432]">
            Catalog Engineering
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
            STRIDE Product Studio
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
            Add real footwear models, adjust pricing and sale discounts, update colorways, or export changes directly into source code.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={resetProducts}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-red-500 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition-colors shadow-xs"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export Code (TS)</span>
          </button>

          <button
            type="button"
            onClick={startCreating}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 mb-8 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by shoe name or tagline..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-transparent focus:border-black dark:focus:border-[#C6F432] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Running', 'Lifestyle', 'Basketball', 'Recovery'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black font-bold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white dark:bg-[#18181A] rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100/70 dark:bg-neutral-800/60 border-b border-black/5 dark:border-white/5 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-3.5 px-6">Product & Visual</th>
                <th className="py-3.5 px-4">Discipline</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Colorways</th>
                <th className="py-3.5 px-4">Sizes</th>
                <th className="py-3.5 px-4">Tags</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                  {/* Visual & Title */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1.5 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-sm text-neutral-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-neutral-500 truncate max-w-xs">{item.tagline}</p>
                        <span className="text-[10px] text-neutral-400 font-mono">ID: {item.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 font-semibold text-neutral-800 dark:text-neutral-200">
                    <div>{item.category}</div>
                    <div className="text-[11px] text-neutral-400 font-normal">{item.gender}</div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 tabular-nums">
                    <div className="font-bold text-sm text-neutral-900 dark:text-white">
                      ${item.price}
                    </div>
                    {item.originalPrice && (
                      <div className="text-[11px] text-neutral-400 line-through">
                        ${item.originalPrice}
                      </div>
                    )}
                  </td>

                  {/* Colors */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      {item.colors.slice(0, 3).map((c) => (
                        <span
                          key={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <span className="text-[10px] text-neutral-400">+{item.colors.length - 3}</span>
                      )}
                    </div>
                  </td>

                  {/* Sizes */}
                  <td className="py-4 px-4 text-neutral-600 dark:text-neutral-300">
                    <div className="tabular-nums font-medium">
                      US {item.sizes[0]} - {item.sizes[item.sizes.length - 1]}
                    </div>
                    <div className="text-[10px] text-neutral-400">{item.sizes.length} sizes</div>
                  </td>

                  {/* Tags */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        to={`/product/${item.id}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View Live Store Page"
                        className="p-2 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(item)}
                        title="Duplicate"
                        className="p-2 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                        title="Edit Product"
                        className="p-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProduct(item.id)}
                        title="Delete Product"
                        className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Edit / Create Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsEditorOpen(false)}
          />

          <div className="relative w-full max-w-3xl bg-[#F7F7F5] dark:bg-[#18181A] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                  {editingProductId ? `Edit Model: ${formData.name}` : 'Create New Footwear Model'}
                </h3>
                <p className="text-xs text-neutral-500">
                  Instant updates are reflected immediately across the storefront.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                    Shoe Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. STRIDE Aero Speed Carbon"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Featherlight kinetic propulsion for marathoners"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden"
                  />
                </div>
              </div>

              {/* Category, Gender, Pricing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                    Discipline
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden"
                  >
                    <option value="Running">Running</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as GenderType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                    Retail Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden font-bold tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="999"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="For sale badge"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden tabular-nums"
                  />
                </div>
              </div>

              {/* Product Imagery Selector / Custom URL */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-2">
                  Select Visual Asset or Enter Image URL
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-3">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          images: [preset.url, ...formData.images.slice(1)],
                          colors: formData.colors.map((c, i) => (i === 0 ? { ...c, image: preset.url } : c))
                        });
                      }}
                      className={`aspect-square rounded-xl border p-1 bg-white dark:bg-neutral-800 flex items-center justify-center transition-all ${
                        formData.images[0] === preset.url
                          ? 'border-black dark:border-[#C6F432] ring-2 ring-black dark:ring-[#C6F432]'
                          : 'border-neutral-200 dark:border-neutral-700 opacity-70 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value, ...formData.images.slice(1)] })}
                    placeholder="Or paste external image URL or data URI..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden font-mono"
                  />
                </div>
              </div>

              {/* Colorways */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider">Colorways</label>
                  <button
                    type="button"
                    onClick={addColorway}
                    className="text-xs font-bold text-[#86b300] dark:text-[#C6F432] hover:underline"
                  >
                    + Add Colorway
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.colors.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white dark:bg-neutral-800 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                      <input
                        type="color"
                        value={c.hex}
                        onChange={(e) => {
                          const updated = [...formData.colors];
                          updated[idx].hex = e.target.value;
                          setFormData({ ...formData, colors: updated });
                        }}
                        className="w-7 h-7 rounded border-none cursor-pointer"
                      />
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => {
                          const updated = [...formData.colors];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, colors: updated });
                        }}
                        placeholder="Colorway name (e.g. Volt Lime)"
                        className="flex-1 px-2.5 py-1 text-xs rounded border border-neutral-300 dark:border-neutral-600 bg-transparent"
                      />
                      {formData.colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColorway(idx)}
                          className="text-neutral-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Available US Sizes */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-2">
                  Available US Sizes
                </label>
                <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
                  {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        formData.sizes.includes(s)
                          ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black border-transparent font-bold'
                          : 'bg-white dark:bg-neutral-800 text-neutral-500 border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags / Badges */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-2">
                  Special Badges / Highlights
                </label>
                <div className="flex gap-2">
                  {(['new', 'bestseller', 'sale'] as TagType[]).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        formData.tags.includes(tag)
                          ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {tag === 'new' ? 'New Arrival' : tag === 'bestseller' ? 'Best Seller' : 'Sale'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Engineered performance details..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-hidden"
                />
              </div>

              {/* Biomechanical Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-100/70 dark:bg-neutral-800/60 p-4 rounded-2xl">
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Weight</label>
                  <input
                    type="text"
                    value={formData.specs.weight}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, weight: e.target.value } })}
                    className="w-full px-2 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Heel Drop</label>
                  <input
                    type="text"
                    value={formData.specs.drop}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, drop: e.target.value } })}
                    className="w-full px-2 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Cushioning</label>
                  <input
                    type="text"
                    value={formData.specs.cushioning}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, cushioning: e.target.value } })}
                    className="w-full px-2 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Terrain</label>
                  <input
                    type="text"
                    value={formData.specs.terrain}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, terrain: e.target.value } })}
                    className="w-full px-2 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                  />
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  Save & Publish Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Code Modal */}
      {isExportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsExportOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#F7F7F5] dark:bg-[#18181A] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-black/10 dark:border-white/10 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                  Export Catalog Code (TypeScript)
                </h3>
                <p className="text-xs text-neutral-500">
                  Copy this code to paste directly into <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono">src/data/products.ts</code> for permanent source storage.
                </p>
              </div>
              <button
                onClick={() => setIsExportOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-neutral-900 text-neutral-200 p-4 rounded-xl font-mono text-xs mb-4 select-all">
              <pre>{exportTsCode}</pre>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-500">
                {products.length} products packaged
              </span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6F432] text-black font-display font-bold text-xs hover:bg-[#b4e029] transition-all"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
