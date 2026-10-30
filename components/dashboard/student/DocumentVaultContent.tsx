'use client';

import React, { useState, useMemo, useRef } from 'react';
import type { User } from '@/types';
import { INITIAL_VAULT_DOCUMENTS, type VaultDocument } from '@/data/studentVault';
import type { UploadContext } from '@/components/dashboard/student/UploadDocumentModal';
import DocumentPreviewModal from '@/components/dashboard/student/DocumentPreviewModal';
import DocumentDetailsModal from '@/components/dashboard/student/DocumentDetailsModal';
import DocumentRemoveModal from '@/components/dashboard/student/DocumentRemoveModal';
import { uploadVaultAsset, downloadVaultAsset } from '@/lib/api';

interface DocumentVaultContentProps {
  user: User;
  onOpenUploadModal: (context: UploadContext) => void;
  onNavigate?: (section: string) => void;
}

type FilterType = 'all' | 'in_review';

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

function FileCardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M13 2H5C3.89543 2 3 2.89543 3 4V18C3 19.1046 3.89543 20 5 20H17C18.1046 20 19 19.1046 19 18V8L13 2Z"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 2V8H19"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 12H9" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 16H15" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M1.5 9C2.85 5.4 5.7 3.375 9 3.375C12.3 3.375 15.15 5.4 16.5 9C15.15 12.6 12.3 14.625 9 14.625C5.7 14.625 2.85 12.6 1.5 9Z"
        stroke="#15803D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="2.8" stroke="#15803D" strokeWidth="1.6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 2.5V11.5M9 11.5L5.5 8M9 11.5L12.5 8"
        stroke="#15803D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 14.5H15.5"
        stroke="#15803D"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11 2L14 5L5 14H2V11L11 2Z"
        stroke="#15803D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 3.5L12.5 6.5" stroke="#15803D" strokeWidth="1.5" />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 16V6M12 6L7.5 10.5M12 6L16.5 10.5"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 17V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V17"
        stroke="#15803D"
        strokeWidth="2"
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

function _TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M2.5 4.5H13.5M6 7V11.5M10 7V11.5M5.5 4.5V2.5C5.5 2.22386 5.72386 2 6 2H10C10.2761 2 10.5 2.22386 10.5 2.5V4.5M12.5 4.5V13.5C12.5 13.7761 12.2761 14 12 14H4C3.72386 14 3.5 13.7761 3.5 13.5V4.5H12.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  const [activePreviewDoc, setActivePreviewDoc] = useState<VaultDocument | null>(null);
  const [activeDetailsDoc, setActiveDetailsDoc] = useState<VaultDocument | null>(null);
  const [activeRemoveDoc, setActiveRemoveDoc] = useState<VaultDocument | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropzoneInputRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    return {
      all: documents.length,
      in_review: documents.filter((d) => d.status === 'in_review').length,
    };
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (activeFilter === 'in_review' && doc.status !== 'in_review') return false;

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

  const handleSaveDocumentTitle = (docId: string, newTitle: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, name: newTitle } : doc))
    );
    setActivePreviewDoc((prev) => (prev && prev.id === docId ? { ...prev, name: newTitle } : prev));
  };

  const handleConfirmRemove = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
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
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 xl:px-10 py-6 sm:py-8 min-w-0 bg-white">
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
              allowVaultChoice: false,
            })
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-[13px] font-semibold hover:bg-[#14532D] transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <UploadIcon />
          <span>Upload document</span>
        </button>
      </div>

      {/* Metrics Cards (Row of 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            {counts.in_review} in review
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

        {/* Card 3: Storage used */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="rounded-xl border border-[#E2EBE5] bg-white p-4 sm:p-5 shadow-xs hover:border-[#C9D8CE] transition-all flex flex-col justify-between min-h-[258px] min-w-0 overflow-hidden"
            >
              <div className="min-w-0">
                {/* Top: Icon + In Review Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
                    <FileCardIcon />
                  </div>

                  {doc.status === 'in_review' && (
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      In review
                    </span>
                  )}
                </div>

                {/* Inner Card (Help Card) with Title, Meta, and Step Tag */}
                <div className="rounded-[7px] border border-[#E2EBE5] bg-[#F7FBF8] p-3 mb-4 min-w-0">
                  <h3
                    className="text-[15px] sm:text-[16px] font-bold text-[#13241A] font-jakarta leading-6 truncate mb-1"
                    title={doc.name}
                  >
                    {doc.name}
                  </h3>
                  <p
                    className="text-[12px] sm:text-[13px] text-[#5E7165] font-sans leading-5 mb-3 truncate"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {doc.type} · {doc.size} · Uploaded {doc.uploadedDate}
                  </p>

                  <div className="flex items-center min-w-0">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold text-[#33463A] bg-[#F0FDF4] border border-[#E2EBE5] max-w-full truncate"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span className="truncate">{doc.clearanceCategory}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 pt-1 -ml-1">
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(doc)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[13px] sm:text-[14px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors cursor-pointer shrink-0"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <EyeIcon />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[13px] sm:text-[14px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors cursor-pointer shrink-0"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <DownloadIcon />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDetailsDoc(doc)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[13px] sm:text-[14px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors cursor-pointer shrink-0"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <DetailsIcon />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}

          {/* Drag & Drop Card in Grid matching Figma [205:5597] */}
          {!searchQuery && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDropFiles}
              className={`min-h-[240px] sm:min-h-[258px] rounded-xl border border-dashed p-4 sm:p-6 flex flex-col items-center justify-center text-center transition-all min-w-0 ${
                isDragging
                  ? 'border-[#15803D] bg-[#DCFCE7]'
                  : 'border-[#16A34A] bg-[#F0FDF4] hover:bg-[#E9F9EE]'
              }`}
            >
              <input
                ref={dropzoneInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#15803D] mb-3 sm:mb-3.5 shrink-0">
                <UploadCloudIcon />
              </div>

              <p className="text-[15px] sm:text-[16px] font-bold text-[#13241A] font-jakarta mb-1 sm:mb-1.5 max-w-full truncate px-2">
                Drag and drop files here
              </p>
              <p
                className="text-[13px] sm:text-[14px] text-[#5E7165] mb-4 sm:mb-5 max-w-full px-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                PDF, JPG or PNG · up to 5 MB each
              </p>

              <button
                type="button"
                onClick={() => dropzoneInputRef.current?.click()}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-[#16A34A] bg-white text-[13px] sm:text-[14px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Browse files
              </button>
            </div>
          )}
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

      {/* Preview Modal */}
      <DocumentPreviewModal
        isOpen={!!activePreviewDoc}
        document={activePreviewDoc}
        onClose={() => setActivePreviewDoc(null)}
        onEditDetails={(doc) => {
          setActivePreviewDoc(null);
          setActiveDetailsDoc(doc);
        }}
        onDownload={handleDownload}
      />

      {/* Details Modal (Dynamic Title Editing) */}
      <DocumentDetailsModal
        isOpen={!!activeDetailsDoc}
        document={activeDetailsDoc}
        onClose={() => setActiveDetailsDoc(null)}
        onSaveTitle={handleSaveDocumentTitle}
      />

      {/* Remove Confirm Modal */}
      <DocumentRemoveModal
        isOpen={!!activeRemoveDoc}
        document={activeRemoveDoc}
        onClose={() => setActiveRemoveDoc(null)}
        onConfirmRemove={handleConfirmRemove}
      />
    </div>
  );
}
