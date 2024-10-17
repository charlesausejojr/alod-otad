import express from "express";
import PeerController from "../controllers/peerController.js";

const router = express.Router();

// Define routes
router.post('/', PeerController.createPeer);
router.get('/', PeerController.getPeers);
router.delete('/:steamId', PeerController.deletePeer);
router.put('/:steamId', PeerController.updatePeer);

export default router;