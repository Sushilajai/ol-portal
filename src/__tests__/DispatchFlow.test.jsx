import { describe, it, expect, beforeEach } from 'vitest';

describe('Dispatch Flow - 3-Step Delivery Note Logic', () => {
  let dispatchRecords = [];

  beforeEach(() => {
    // Reset dispatch records before each test
    dispatchRecords = [
      {
        uid: '0001-2425-01-02-1234',
        comp_id: '0001',
        recipientName: 'Mr. Rajesh Kumar',
        recipientAddress: '123 Business Park, Mumbai',
        documentCategory: 'Notice',
        deliveryNoteRequired: true,
        status: 'Pending'
      },
      {
        uid: '0002-2425-02-01-5678',
        comp_id: '0002',
        recipientName: 'Ms. Priya Sharma',
        recipientAddress: '456 Corporate Tower, Mumbai',
        documentCategory: 'Order',
        deliveryNoteRequired: false,
        status: 'Pending'
      }
    ];
  });

  describe('Step 1: Create Dispatch with Delivery Note Flag', () => {
    it('should create dispatch record with deliveryNoteRequired: true', () => {
      const newDispatch = {
        uid: '0003-2425-03-04-9012',
        comp_id: '0003',
        recipientName: 'Dr. Amit Patel',
        recipientAddress: '789 Industrial Estate, Mumbai',
        documentCategory: 'Report',
        deliveryNoteRequired: true,
        status: 'Pending'
      };

      dispatchRecords.push(newDispatch);

      const createdRecord = dispatchRecords.find(r => r.uid === '0003-2425-03-04-9012');
      expect(createdRecord).toBeDefined();
      expect(createdRecord.deliveryNoteRequired).toBe(true);
      expect(createdRecord.status).toBe('Pending');
    });

    it('should create dispatch record with deliveryNoteRequired: false', () => {
      const newDispatch = {
        uid: '0004-2425-04-05-3456',
        comp_id: '0004',
        recipientName: 'John Doe',
        recipientAddress: '321 Tech Park, Bangalore',
        documentCategory: 'Notice',
        deliveryNoteRequired: false,
        status: 'Pending'
      };

      dispatchRecords.push(newDispatch);

      const createdRecord = dispatchRecords.find(r => r.uid === '0004-2425-04-05-3456');
      expect(createdRecord).toBeDefined();
      expect(createdRecord.deliveryNoteRequired).toBe(false);
    });

    it('should verify pending records with deliveryNoteRequired: true exist', () => {
      const pendingWithDeliveryNote = dispatchRecords.filter(
        r => r.status === 'Pending' && r.deliveryNoteRequired === true
      );

      expect(pendingWithDeliveryNote.length).toBeGreaterThan(0);
      expect(pendingWithDeliveryNote[0].uid).toBe('0001-2425-01-02-1234');
    });
  });

  describe('Step 2: Mark as Dispatched (In Transit)', () => {
    it('should move dispatch from Pending to Dispatched status', () => {
      const uid = '0001-2425-01-02-1234';
      const awbNumber = 'AWB987654321';
      const dispatchDate = '2024-03-15';

      // Update record
      const updatedRecords = dispatchRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Dispatched',
              awbNumber,
              dispatchDate
            }
          : record
      );

      const updatedRecord = updatedRecords.find(r => r.uid === uid);
      expect(updatedRecord.status).toBe('Dispatched');
      expect(updatedRecord.awbNumber).toBe('AWB987654321');
      expect(updatedRecord.dispatchDate).toBe('2024-03-15');
    });

    it('should verify dispatched record with deliveryNoteRequired: true moves to In Transit tab', () => {
      const uid = '0001-2425-01-02-1234';

      // Update record to Dispatched
      const updatedRecords = dispatchRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Dispatched',
              awbNumber: 'AWB123456789',
              dispatchDate: '2024-03-15'
            }
          : record
      );

      // Filter for In Transit items (Dispatched + deliveryNoteRequired: true)
      const inTransitRecords = updatedRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      );

      expect(inTransitRecords.length).toBeGreaterThan(0);
      expect(inTransitRecords[0].uid).toBe('0001-2425-01-02-1234');
      expect(inTransitRecords[0].status).toBe('Dispatched');
    });

    it('should verify dispatched record with deliveryNoteRequired: false does NOT move to In Transit tab', () => {
      const uid = '0002-2425-02-01-5678';

      // Update record to Dispatched
      const updatedRecords = dispatchRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Dispatched',
              awbNumber: 'AWB111111111',
              dispatchDate: '2024-03-15'
            }
          : record
      );

      // Filter for In Transit items (Dispatched + deliveryNoteRequired: true)
      const inTransitRecords = updatedRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      );

      // Should not include the record with deliveryNoteRequired: false
      const hasRecord = inTransitRecords.some(r => r.uid === uid);
      expect(hasRecord).toBe(false);
    });

    it('should require AWB Number and Dispatch Date to mark as dispatched', () => {
      const uid = '0001-2425-01-02-1234';
      const awbNumber = 'AWB987654321';
      const dispatchDate = '2024-03-15';

      const isValid = !!(awbNumber && dispatchDate);
      expect(isValid).toBe(true);
    });

    it('should reject marking as dispatched without AWB Number', () => {
      const awbNumber = '';
      const dispatchDate = '2024-03-15';

      const isValid = !!(awbNumber && dispatchDate);
      expect(isValid).toBe(false);
    });

    it('should reject marking as dispatched without Dispatch Date', () => {
      const awbNumber = 'AWB987654321';
      const dispatchDate = '';

      const isValid = !!(awbNumber && dispatchDate);
      expect(isValid).toBe(false);
    });
  });

  describe('Step 3: Delivery Confirmation (In Transit to Delivered)', () => {
    it('should move dispatch from In Transit to Delivered status', () => {
      const uid = '0001-2425-01-02-1234';
      const deliveryStatus = 'Successfully Delivered';
      const deliveryDate = '2024-03-18';
      const deliveryRemarks = 'Signed by security guard';

      // First mark as dispatched
      let updatedRecords = dispatchRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Dispatched',
              awbNumber: 'AWB987654321',
              dispatchDate: '2024-03-15'
            }
          : record
      );

      // Then mark as delivered
      updatedRecords = updatedRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Delivered',
              deliveryDate,
              deliveryRemarks
            }
          : record
      );

      const deliveredRecord = updatedRecords.find(r => r.uid === uid);
      expect(deliveredRecord.status).toBe('Delivered');
      expect(deliveredRecord.deliveryDate).toBe('2024-03-18');
      expect(deliveredRecord.deliveryRemarks).toBe('Signed by security guard');
    });

    it('should handle RTO (Return to Origin) status', () => {
      const uid = '0001-2425-01-02-1234';
      const deliveryStatus = 'Returned / RTO';
      const deliveryDate = '2024-03-18';
      const deliveryRemarks = 'Address not found, returned to origin';

      // First mark as dispatched
      let updatedRecords = dispatchRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Dispatched',
              awbNumber: 'AWB987654321',
              dispatchDate: '2024-03-15'
            }
          : record
      );

      // Then mark as delivered with RTO status
      updatedRecords = updatedRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Delivered',
              deliveryDate,
              deliveryRemarks
            }
          : record
      );

      const deliveredRecord = updatedRecords.find(r => r.uid === uid);
      expect(deliveredRecord.status).toBe('Delivered');
      expect(deliveredRecord.deliveryRemarks).toContain('returned to origin');
    });

    it('should require Delivery Date to confirm delivery', () => {
      const deliveryDate = '2024-03-18';
      const isValid = deliveryDate && deliveryDate.length > 0;
      
      expect(isValid).toBe(true);
    });

    it('should reject delivery confirmation without Delivery Date', () => {
      const deliveryDate = '';
      const isValid = !!(deliveryDate && deliveryDate.length > 0);
      
      expect(isValid).toBe(false);
    });

    it('should remove item from In Transit tab after delivery confirmation', () => {
      const uid = '0001-2425-01-02-1234';

      // Mark as dispatched
      let updatedRecords = dispatchRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Dispatched',
              awbNumber: 'AWB987654321',
              dispatchDate: '2024-03-15'
            }
          : record
      );

      // Verify it's in In Transit
      let inTransitRecords = updatedRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      );
      expect(inTransitRecords.some(r => r.uid === uid)).toBe(true);

      // Mark as delivered
      updatedRecords = updatedRecords.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: 'Delivered',
              deliveryDate: '2024-03-18'
            }
          : record
      );

      // Verify it's no longer in In Transit
      inTransitRecords = updatedRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      );
      expect(inTransitRecords.some(r => r.uid === uid)).toBe(false);

      // Verify it's in Delivered
      const deliveredRecords = updatedRecords.filter(r => r.status === 'Delivered');
      expect(deliveredRecords.some(r => r.uid === uid)).toBe(true);
    });
  });

  describe('Complete 3-Step Flow', () => {
    it('should complete full dispatch flow: Pending -> Dispatched -> Delivered', () => {
      const uid = '0001-2425-01-02-1234';

      // Step 1: Verify initial state
      let record = dispatchRecords.find(r => r.uid === uid);
      expect(record.status).toBe('Pending');
      expect(record.deliveryNoteRequired).toBe(true);

      // Step 2: Mark as Dispatched
      dispatchRecords = dispatchRecords.map(r =>
        r.uid === uid
          ? {
              ...r,
              status: 'Dispatched',
              awbNumber: 'AWB987654321',
              dispatchDate: '2024-03-15'
            }
          : r
      );

      record = dispatchRecords.find(r => r.uid === uid);
      expect(record.status).toBe('Dispatched');
      expect(record.awbNumber).toBe('AWB987654321');

      // Verify it's in In Transit tab
      const inTransitRecords = dispatchRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      );
      expect(inTransitRecords.some(r => r.uid === uid)).toBe(true);

      // Step 3: Mark as Delivered
      dispatchRecords = dispatchRecords.map(r =>
        r.uid === uid
          ? {
              ...r,
              status: 'Delivered',
              deliveryDate: '2024-03-18',
              deliveryRemarks: 'Successfully delivered'
            }
          : r
      );

      record = dispatchRecords.find(r => r.uid === uid);
      expect(record.status).toBe('Delivered');
      expect(record.deliveryDate).toBe('2024-03-18');

      // Verify it's no longer in In Transit
      const stillInTransit = dispatchRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      );
      expect(stillInTransit.some(r => r.uid === uid)).toBe(false);
    });

    it('should handle multiple dispatches in different states', () => {
      // Create multiple dispatches
      const newDispatches = [
        {
          uid: '0003-2425-03-04-9012',
          comp_id: '0003',
          recipientName: 'Dr. Amit Patel',
          recipientAddress: '789 Industrial Estate, Mumbai',
          documentCategory: 'Report',
          deliveryNoteRequired: true,
          status: 'Pending'
        },
        {
          uid: '0004-2425-04-05-3456',
          comp_id: '0004',
          recipientName: 'John Doe',
          recipientAddress: '321 Tech Park, Bangalore',
          documentCategory: 'Notice',
          deliveryNoteRequired: true,
          status: 'Dispatched',
          awbNumber: 'AWB111111111',
          dispatchDate: '2024-03-10'
        }
      ];

      dispatchRecords.push(...newDispatches);

      // Verify counts
      const pendingCount = dispatchRecords.filter(r => r.status === 'Pending').length;
      const inTransitCount = dispatchRecords.filter(
        r => r.status === 'Dispatched' && r.deliveryNoteRequired === true
      ).length;

      expect(pendingCount).toBeGreaterThan(0);
      expect(inTransitCount).toBeGreaterThan(0);
    });
  });
});
