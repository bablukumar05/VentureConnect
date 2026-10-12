const DataRoomDocument = require('../models/DataRoomDocument');
const TermSheet = require('../models/TermSheet');
const Startup = require('../models/Startup');
const User = require('../models/User');

exports.getDataRoomDocuments = async (req, res) => {
  try {
    const { startupId } = req.params;
    let query = {};

    if (startupId) {
      query.startup = startupId;
    } else if (req.user.role === 'founder') {
      const startup = await Startup.findOne({ founder: req.user._id });
      if (!startup) {
        return res.status(200).json({ success: true, documents: [] });
      }
      query.startup = startup._id;
    }

    const documents = await DataRoomDocument.find(query)
      .populate('startup', 'name industry logo')
      .populate('accessRequests.investor', 'name email avatar')
      .sort({ createdAt: -1 });

    const processed = documents.map((doc) => {
      const docObj = doc.toObject();
      if (req.user.role === 'investor') {
        const userReq = docObj.accessRequests.find(
          (r) => r.investor && (r.investor._id?.toString() === req.user._id.toString() || r.investor.toString() === req.user._id.toString())
        );
        const isApproved = userReq && userReq.status === 'approved' && (!userReq.expiresAt || new Date(userReq.expiresAt) > new Date());
        return {
          ...docObj,
          hasAccess: !docObj.isLocked || isApproved,
          myRequestStatus: userReq ? userReq.status : 'none',
          watermark: isApproved ? userReq.watermarkText || `CONFIDENTIAL • ${req.user.email} • ${new Date().toISOString().slice(0, 10)}` : null,
          accessRequests: undefined,
        };
      }
      return docObj;
    });

    res.status(200).json({
      success: true,
      count: processed.length,
      documents: processed,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadDataRoomDocument = async (req, res) => {
  try {
    const { title, category, startupId, isLocked, fileUrl, fileSize, fileType } = req.body;
    let targetStartupId = startupId;

    if (!targetStartupId) {
      const startup = await Startup.findOne({ founder: req.user._id });
      if (!startup) {
        return res.status(400).json({ success: false, message: 'Startup not found for founder' });
      }
      targetStartupId = startup._id;
    }

    const newDoc = await DataRoomDocument.create({
      startup: targetStartupId,
      title: title || 'Confidential Diligence Document',
      category: category || 'Due Diligence',
      fileUrl: fileUrl || (req.file ? `/uploads/${req.file.filename}` : 'https://res.cloudinary.com/demo/image/upload/sample.pdf'),
      fileType: fileType || 'pdf',
      fileSize: fileSize || '1.4 MB',
      isLocked: isLocked !== undefined ? isLocked : true,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded to Virtual Data Room',
      document: newDoc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.requestDocumentAccess = async (req, res) => {
  try {
    const { documentId } = req.params;
    const doc = await DataRoomDocument.findById(documentId);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const existingReq = doc.accessRequests.find(
      (r) => r.investor.toString() === req.user._id.toString()
    );

    if (existingReq) {
      existingReq.status = 'pending';
      existingReq.requestedAt = new Date();
    } else {
      doc.accessRequests.push({
        investor: req.user._id,
        status: 'pending',
        requestedAt: new Date(),
      });
    }

    await doc.save();
    res.status(200).json({
      success: true,
      message: 'Access request submitted to founder',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.manageDocumentAccess = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { investorId, action, durationDays = 7 } = req.body;

    const doc = await DataRoomDocument.findById(documentId);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const reqItem = doc.accessRequests.find(
      (r) => r.investor.toString() === investorId
    );

    if (!reqItem) {
      return res.status(404).json({ success: false, message: 'Access request not found' });
    }

    if (action === 'approve') {
      const investorUser = await User.findById(investorId);
      reqItem.status = 'approved';
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + Number(durationDays));
      reqItem.expiresAt = expiry;
      reqItem.watermarkText = `CONFIDENTIAL • LICENSED TO: ${investorUser?.email || 'INVESTOR'} • EXPIRES: ${expiry.toISOString().slice(0, 10)}`;
    } else if (action === 'revoke' || action === 'reject') {
      reqItem.status = 'rejected';
      reqItem.expiresAt = new Date();
    }

    await doc.save();
    res.status(200).json({
      success: true,
      message: `Document access ${action}d successfully`,
      document: doc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTermSheets = async (req, res) => {
  try {
    const query = {
      $or: [{ founder: req.user._id }, { investor: req.user._id }],
    };

    const termSheets = await TermSheet.find(query)
      .populate('startup', 'name industry logo fundingGoal')
      .populate('founder', 'name email avatar')
      .populate('investor', 'name email avatar')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: termSheets.length,
      termSheets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTermSheetById = async (req, res) => {
  try {
    const termSheet = await TermSheet.findById(req.params.id)
      .populate('startup', 'name industry logo fundingGoal')
      .populate('founder', 'name email avatar')
      .populate('investor', 'name email avatar');

    if (!termSheet) {
      return res.status(404).json({ success: false, message: 'Term sheet not found' });
    }

    res.status(200).json({ success: true, termSheet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTermSheet = async (req, res) => {
  try {
    const {
      startupId,
      counterpartyId,
      roundName = 'Seed',
      investmentAmount = 500000,
      preMoneyValuation = 4500000,
      liquidationPreference,
      boardSeats,
      protectiveProvisions,
      notes,
    } = req.body;

    let targetStartup = startupId;
    let founderId;
    let investorId;

    if (req.user.role === 'founder') {
      founderId = req.user._id;
      investorId = counterpartyId;
      if (!targetStartup) {
        const startup = await Startup.findOne({ founder: req.user._id });
        if (startup) targetStartup = startup._id;
      }
    } else {
      investorId = req.user._id;
      if (!targetStartup) {
        return res.status(400).json({ success: false, message: 'startupId is required' });
      }
      const st = await Startup.findById(targetStartup);
      if (!st) return res.status(404).json({ success: false, message: 'Startup not found' });
      founderId = counterpartyId || st.founder;
    }

    if (!investorId) {
      const anyInvestor = await User.findOne({ role: 'investor' });
      investorId = anyInvestor ? anyInvestor._id : req.user._id;
    }

    const postMoney = Number(preMoneyValuation) + Number(investmentAmount);
    const equityPct = postMoney > 0 ? Number(((Number(investmentAmount) / postMoney) * 100).toFixed(2)) : 0;

    const termSheet = await TermSheet.create({
      startup: targetStartup,
      founder: founderId,
      investor: investorId,
      roundName,
      investmentAmount,
      preMoneyValuation,
      postMoneyValuation: postMoney,
      equityPercentage: equityPct,
      liquidationPreference: liquidationPreference || '1x Non-Participating Preference',
      boardSeats: boardSeats || '1 Founder, 1 Lead Investor, 1 Independent Observer',
      protectiveProvisions: protectiveProvisions || undefined,
      status: 'sent',
      notes: notes || '',
    });

    const populated = await TermSheet.findById(termSheet._id)
      .populate('startup', 'name industry logo')
      .populate('founder', 'name email avatar')
      .populate('investor', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'Term sheet issued and sent for review',
      termSheet: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTermSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const { investmentAmount, preMoneyValuation, liquidationPreference, boardSeats, protectiveProvisions, notes, status } = req.body;

    const termSheet = await TermSheet.findById(id);
    if (!termSheet) {
      return res.status(404).json({ success: false, message: 'Term sheet not found' });
    }

    if (investmentAmount || preMoneyValuation) {
      const inv = Number(investmentAmount || termSheet.investmentAmount);
      const pre = Number(preMoneyValuation || termSheet.preMoneyValuation);
      termSheet.investmentAmount = inv;
      termSheet.preMoneyValuation = pre;
      termSheet.postMoneyValuation = pre + inv;
      termSheet.equityPercentage = Number(((inv / (pre + inv)) * 100).toFixed(2));
      termSheet.founderSignature = { signed: false, signatureDataUrl: null, signedAt: null, signerName: '' };
      termSheet.investorSignature = { signed: false, signatureDataUrl: null, signedAt: null, signerName: '' };
      termSheet.status = 'under_review';
    }

    if (liquidationPreference) termSheet.liquidationPreference = liquidationPreference;
    if (boardSeats) termSheet.boardSeats = boardSeats;
    if (protectiveProvisions) termSheet.protectiveProvisions = protectiveProvisions;
    if (notes !== undefined) termSheet.notes = notes;
    if (status) termSheet.status = status;

    await termSheet.save();

    const updated = await TermSheet.findById(id)
      .populate('startup', 'name industry logo')
      .populate('founder', 'name email avatar')
      .populate('investor', 'name email avatar');

    res.status(200).json({
      success: true,
      message: 'Term sheet updated',
      termSheet: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.signTermSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const { signatureDataUrl, signerName } = req.body;

    if (!signatureDataUrl) {
      return res.status(400).json({ success: false, message: 'Signature canvas drawing is required' });
    }

    const termSheet = await TermSheet.findById(id);
    if (!termSheet) {
      return res.status(404).json({ success: false, message: 'Term sheet not found' });
    }

    const isFounder = req.user.role === 'founder' || termSheet.founder.toString() === req.user._id.toString();
    const isInvestor = req.user.role === 'investor' || termSheet.investor.toString() === req.user._id.toString();

    if (isFounder) {
      termSheet.founderSignature = {
        signed: true,
        signatureDataUrl,
        signedAt: new Date(),
        signerName: signerName || req.user.name,
      };
    } else if (isInvestor) {
      termSheet.investorSignature = {
        signed: true,
        signatureDataUrl,
        signedAt: new Date(),
        signerName: signerName || req.user.name,
      };
    }

    if (termSheet.founderSignature.signed && termSheet.investorSignature.signed) {
      termSheet.status = 'signed';
    } else {
      termSheet.status = 'under_review';
    }

    await termSheet.save();

    const signedDoc = await TermSheet.findById(id)
      .populate('startup', 'name industry logo')
      .populate('founder', 'name email avatar')
      .populate('investor', 'name email avatar');

    res.status(200).json({
      success: true,
      message: termSheet.status === 'signed' ? 'Deal Term Sheet fully executed by both parties!' : 'Signature recorded successfully',
      termSheet: signedDoc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
