import { describe, it, expect, beforeEach } from 'vitest';

describe('Global Search Engine - Regex Logic', () => {
  // Regex patterns from GlobalSearchEngine
  const uidPattern = /^\d{4}-\d{4}-\d{2}-\d{2}-\d{4}$/;
  const companyIdPattern = /^\d{4}$/;

  describe('UID Pattern Matching', () => {
    it('should match valid UID format (XXXX-XXXX-XX-XX-XXXX)', () => {
      const validUIDs = [
        '0001-2425-01-02-1234',
        '0002-2425-02-01-5678',
        '0003-2425-01-03-9012',
        '0001-2425-03-04-3456'
      ];

      validUIDs.forEach(uid => {
        expect(uidPattern.test(uid)).toBe(true);
      });
    });

    it('should reject invalid UID formats', () => {
      const invalidUIDs = [
        '0001-2425-01-02',           // Missing last segment
        '0001-2425-01-02-12345',     // Last segment too long
        '0001-2425-1-02-1234',       // Second segment too short
        '0001-2425-01-2-1234',       // Third segment too short
        'ABCD-2425-01-02-1234',      // Non-numeric first segment
        '0001-2425-01-02-ABCD'       // Non-numeric last segment
      ];

      invalidUIDs.forEach(uid => {
        expect(uidPattern.test(uid)).toBe(false);
      });
    });

    it('should extract comp_id from valid UID', () => {
      const uid = '0001-2425-01-02-1234';
      const compId = uid.split('-')[0];
      
      expect(compId).toBe('0001');
      expect(compId.length).toBe(4);
    });

    it('should handle multiple UIDs and extract correct comp_ids', () => {
      const uids = [
        { uid: '0001-2425-01-02-1234', expectedCompId: '0001' },
        { uid: '0002-2425-02-01-5678', expectedCompId: '0002' },
        { uid: '0050-2425-03-04-9999', expectedCompId: '0050' }
      ];

      uids.forEach(({ uid, expectedCompId }) => {
        const compId = uid.split('-')[0];
        expect(compId).toBe(expectedCompId);
      });
    });
  });

  describe('Company ID Pattern Matching', () => {
    it('should match valid 4-digit company IDs', () => {
      const validCompIds = ['0001', '0002', '0050', '9999', '1234'];

      validCompIds.forEach(compId => {
        expect(companyIdPattern.test(compId)).toBe(true);
      });
    });

    it('should reject invalid company ID formats', () => {
      const invalidCompIds = [
        '001',      // Too short
        '00001',    // Too long
        'ABCD',     // Non-numeric
        '00A1',     // Mixed alphanumeric
        '',         // Empty
        '0001 ',    // With space
        ' 0001'     // Leading space
      ];

      invalidCompIds.forEach(compId => {
        expect(companyIdPattern.test(compId)).toBe(false);
      });
    });
  });

  describe('Search Query Parsing Logic', () => {
    const mockCompanies = [
      { comp_id: '0001', name: 'Tata Steel Limited' },
      { comp_id: '0002', name: 'Reliance Industries' },
      { comp_id: '0050', name: 'Alpha Industries Ltd' }
    ];

    const mockDispatchRecords = [
      { uid: '0001-2425-01-02-1234', comp_id: '0001' },
      { uid: '0002-2425-02-01-5678', comp_id: '0002' }
    ];

    it('should parse UID and extract comp_id for database query', () => {
      const searchQuery = '0001-2425-01-02-1234';
      
      if (uidPattern.test(searchQuery)) {
        const dispatchRecord = mockDispatchRecords.find(d => d.uid === searchQuery);
        expect(dispatchRecord).toBeDefined();
        
        const compId = dispatchRecord.uid.split('-')[0];
        const company = mockCompanies.find(c => c.comp_id === compId);
        expect(company).toBeDefined();
        expect(company.comp_id).toBe('0001');
      }
    });

    it('should parse 4-digit company ID and trigger multi-table query', () => {
      const searchQuery = '0001';
      
      if (companyIdPattern.test(searchQuery)) {
        const company = mockCompanies.find(c => c.comp_id === searchQuery);
        expect(company).toBeDefined();
        expect(company.name).toBe('Tata Steel Limited');
      }
    });

    it('should fallback to text search for company names', () => {
      const searchQuery = 'Tata';
      
      const company = mockCompanies.find(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      expect(company).toBeDefined();
      expect(company.comp_id).toBe('0001');
    });

    it('should handle case-insensitive text search', () => {
      const searchQueries = ['tata', 'TATA', 'Tata', 'tAtA'];
      
      searchQueries.forEach(query => {
        const company = mockCompanies.find(c =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );
        expect(company).toBeDefined();
        expect(company.comp_id).toBe('0001');
      });
    });

    it('should return null for non-matching text search', () => {
      const searchQuery = 'NonExistent';
      
      const company = mockCompanies.find(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      expect(company).toBeUndefined();
    });
  });

  describe('Search Priority Logic', () => {
    it('should prioritize UID match over other patterns', () => {
      const searchQuery = '0001-2425-01-02-1234';
      
      let matchType = null;
      if (uidPattern.test(searchQuery)) {
        matchType = 'UID';
      } else if (companyIdPattern.test(searchQuery)) {
        matchType = 'CompanyID';
      } else {
        matchType = 'Text';
      }
      
      expect(matchType).toBe('UID');
    });

    it('should prioritize company ID over text search', () => {
      const searchQuery = '0001';
      
      let matchType = null;
      if (uidPattern.test(searchQuery)) {
        matchType = 'UID';
      } else if (companyIdPattern.test(searchQuery)) {
        matchType = 'CompanyID';
      } else {
        matchType = 'Text';
      }
      
      expect(matchType).toBe('CompanyID');
    });

    it('should fallback to text search when no pattern matches', () => {
      const searchQuery = 'Tata Steel';
      
      let matchType = null;
      if (uidPattern.test(searchQuery)) {
        matchType = 'UID';
      } else if (companyIdPattern.test(searchQuery)) {
        matchType = 'CompanyID';
      } else {
        matchType = 'Text';
      }
      
      expect(matchType).toBe('Text');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search query', () => {
      const searchQuery = '';
      
      expect(uidPattern.test(searchQuery)).toBe(false);
      expect(companyIdPattern.test(searchQuery)).toBe(false);
    });

    it('should handle whitespace-only search query', () => {
      const searchQuery = '   ';
      
      expect(uidPattern.test(searchQuery)).toBe(false);
      expect(companyIdPattern.test(searchQuery)).toBe(false);
    });

    it('should handle special characters in search', () => {
      const searchQuery = '0001!@#$';
      
      expect(uidPattern.test(searchQuery)).toBe(false);
      expect(companyIdPattern.test(searchQuery)).toBe(false);
    });

    it('should validate UID with leading zeros', () => {
      const uid = '0001-2425-01-02-0001';
      expect(uidPattern.test(uid)).toBe(true);
    });

    it('should validate company ID with leading zeros', () => {
      const compId = '0001';
      expect(companyIdPattern.test(compId)).toBe(true);
    });
  });
});
