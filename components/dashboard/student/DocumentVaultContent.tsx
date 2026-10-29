'use client';

import React, { useState, useMemo, useRef } from 'react';
import type { User } from '@/types';
import { INITIAL_VAULT_DOCUMENTS, type VaultDocument } from '@/data/studentVault';
import type { UploadContext } from '@/components/dashboard/student/UploadDocumentModal';
import DocumentPreviewModal from '@/components/dashboard/student/DocumentPreviewModal';
import { uploadVaultAsset, downloadVaultAsset } from '@/lib/api';

interface DocumentVaultContentProps {
  user: User;
  onOpenUploadModal: (context: UploadContext) => void;
  onNavigate?: (section: string) => void;
}

type FilterType = 'all' | 'in_review' | 'approved';

/* ─── SVG Icons ─── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 11V3M8 3L4.5 6.5M8 3L11.5 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 11V13C2.5 13.5523 2.94772 14 3.5 14H12.5C13.0523 14 13.5 13.5523 13.5 13V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M1.5 8C2.8 4.8 5.2 3 8 3C10.8 3 13.2 4.8 14.5 8C13.2 11.2 10.8 13 8 13C5.2 13 2.8 11.2 1.5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5M2.5 13.5H13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#9CA3AF]">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7V11M8 5V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function DocumentVaultContent({
  user: _user,
  onOpenUploadModal,
}: DocumentVaultContentProps) {
  const [documents, setDocuments] = useState<VaultDocument[]>(INITIAL_VAULT_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeModalDoc, setActiveModalDoc] = useState<VaultDocument | null>(null);
  const [modalMode, setModalMode] = useState<'preview' | 'details'>('preview');
  const [isDragging, setIsDragging] = useState(false);
  const dropzoneInputRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    return {
      all: documents.length,
      in_review: documents.filter((d) => d.status === 'in_review').length,
      approved: documents.filter((d) => d.status === 'approved').length,
    };
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (activeFilter === 'in_review' && doc.status !== 'in_review') return false;
      if (activeFilter === 'approved' && doc.status !== 'approved') return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = doc.name.toLowerCase().includes(query);
        const matchCat = doc.clearanceCategory.toLowerCase().includes(query);
        const matchType = doc.type.toLowerCase().includes(query);
        return matchName || matchCat || matchType;
      }
      return true;
    });
  }, [documents, activeFilter, searchQuery]);

  const handleOpenModal = (doc: VaultDocument, mode: 'preview' | 'details') => {
    setActiveModalDoc(doc);
    setModalMode(mode);
  };

  const handleDownload = async (doc: VaultDocument) => {
    await downloadVaultAsset(doc.id, doc.name);
  };

  const handleProcessUploadedFile = async (file: File) => {
    const tempId = String(Date.now());
    const newDoc: VaultDocument = {
      id: tempId,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      sizeBytes: file.size,
      uploadedDate: 'Just now',
      clearanceCategory: 'General Upload',
      status: 'in_review',
    };
    setDocuments((prev) => [newDoc, ...prev]);

    try {
      const res = await uploadVaultAsset(file);
      if (res && res.id) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === tempId ? { ...d, id: res.id } : d)),
        );
      }
    } catch (err) {
      console.warn('[DocumentVaultContent] Upload error fallback:', err);
    }
  };

  const handleDropFiles = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 xl:px-10 py-8 min-w-0 bg-white">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-[26px] font-bold text-[#13241A] font-jakarta tracking-tight mb-1">
            Document vault
          </h1>
          <p className="text-[14px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
            All your clearance documents in one secure place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpenUploadModal({
              clearanceTitle: 'Document Vault',
              stepTitle: 'Upload Clearance File',
              docDescription: 'PDF, JPG or PNG up to 5 MB',
            })
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-[13px] font-semibold hover:bg-[#14532D] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <UploadIcon />
          <span>Upload document</span>
        </button>
      </div>

      {/* Metrics Cards (Row of 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Documents tracked */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-[#5F6D64] mb-2">
            <span className="text-[13px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Documents tracked
            </span>
            <InfoCircleIcon />
          </div>
          <p className="text-[28px] font-bold text-[#13241A] font-jakarta mb-1">
            {counts.all}
          </p>
          <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {counts.approved} approved · {counts.in_review} in review
          </p>
        </div>

        {/* Card 2: In review */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-[#5F6D64] mb-2">
            <span className="text-[13px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              In review
            </span>
            <InfoCircleIcon />
          </div>
          <p className="text-[28px] font-bold text-[#13241A] font-jakarta mb-1">
            {counts.in_review}
          </p>
          <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Passport photograph
          </p>
        </div>

        {/* Card 3: Approved */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-[#5F6D64] mb-2">
            <span className="text-[13px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Approved
            </span>
            <InfoCircleIcon />
          </div>
          <p className="text-[28px] font-bold text-[#13241A] font-jakarta mb-1">
            {counts.approved}
          </p>
          <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Locked after approval
          </p>
        </div>

        {/* Card 4: Storage used */}
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-[#5F6D64] mb-2">
            <span className="text-[13px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Storage used
            </span>
            <InfoCircleIcon />
          </div>
          <p className="text-[28px] font-bold text-[#13241A] font-jakarta mb-1.5">
            2.4 MB
          </p>
          <div className="w-full h-1.5 rounded-full bg-[#E2EBE5] overflow-hidden mb-1.5">
            <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '12%' }} />
          </div>
          <p className="text-[12px] text-[#5F6D64]" style={{ fontFamily: 'Inter, sans-serif' }}>
            of 20 MB available
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            All <span className="opacity-90">{counts.all}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('in_review')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'in_review'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            In review <span className="opacity-90">{counts.in_review}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('approved')}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'approved'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'border border-[#E2EBE5] bg-white text-[#33463A] hover:bg-[#F7FBF8]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Approved <span className="opacity-90">{counts.approved}</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents"
            className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-[#E2EBE5] bg-white text-[13px] text-[#13241A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#15803D]/40 focus:border-[#15803D]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#13241A] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-[#E2EBE5] bg-white p-5 shadow-xs hover:border-[#C9D8CE] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#15803D] shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M11.667 2.5H5.83366C4.91319 2.5 4.16699 3.24619 4.16699 4.16667V15.8333C4.16699 16.7538 4.91319 17.5 5.83366 17.5H14.167C15.0875 17.5 15.8337 16.7538 15.8337 15.8333V6.66667L11.667 2.5Z"
                        stroke="#15803D"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.667 2.5V6.66667H15.8337"
                        stroke="#15803D"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {doc.status === 'in_review' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF3C7] text-[#B45309] font-sans">
                      In review
                    </span>
                  )}
                </div>

                <h3 className="text-[15px] font-semibold text-[#13241A] font-jakarta mb-1 truncate" title={doc.name}>
                  {doc.name}
                </h3>
                <p className="text-[12px] text-[#9CA3AF] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {doc.type} · {doc.size} · Uploaded {doc.uploadedDate}
                </p>

                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F3F6F4] text-[#5F6D64] font-sans">
                    {doc.clearanceCategory}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-4 pt-3 border-t border-[#F0F4F1] text-[13px] font-medium text-[#13241A]">
                <button
                  type="button"
                  onClick={() => handleOpenModal(doc, 'preview')}
                  className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <EyeIcon />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <DownloadIcon />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenModal(doc, 'details')}
                  className="flex items-center gap-1.5 hover:text-[#15803D] transition-colors cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <DetailsIcon />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-[#E2EBE5] bg-white p-12 flex flex-col items-center justify-center text-center my-6">
          <div className="w-14 h-14 rounded-full bg-[#F3F6F4] flex items-center justify-center text-[#5F6D64] mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-[17px] font-bold text-[#13241A] font-jakarta mb-1.5">
            {searchQuery ? `No documents match “${searchQuery}”` : 'No documents in this filter'}
          </h3>
          <p className="text-[13px] text-[#5F6D64] max-w-105 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Check your spelling or choose a different filter tab.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-4 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Clear search
          </button>
        </div>
      )}

      {/* Drag & Drop Dropzone at Bottom */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDropFiles}
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all ${
          isDragging
            ? 'border-[#15803D] bg-[#F0FDF4]'
            : 'border-[#86EFAC] bg-white hover:bg-[#F7FBF8]'
        }`}
      >
        <input
          ref={dropzoneInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#15803D] mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V8M12 8L8.5 11.5M12 8L15.5 11.5"
              stroke="#15803D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16"
              stroke="#15803D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="text-[15px] font-bold text-[#13241A] font-jakarta mb-1">
          Drag and drop files here
        </p>
        <p className="text-[12px] text-[#8A9A90] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          PDF, JPG or PNG · up to 5 MB each
        </p>

        <button
          type="button"
          onClick={() => dropzoneInputRef.current?.click()}
          className="px-5 py-2 rounded-xl border border-[#C9D8CE] bg-white text-[13px] font-semibold text-[#13241A] hover:bg-[#F7FBF8] transition-colors cursor-pointer shadow-xs"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Browse files
        </button>
      </div>

      {/* Preview / Details Modal */}
      <DocumentPreviewModal
        isOpen={!!activeModalDoc}
        document={activeModalDoc}
        mode={modalMode}
        onClose={() => setActiveModalDoc(null)}
      />
    </div>
  );
}
