const PeerService = require('../services/peerService');

class PeerController {
  static async createPeer(req, res) {
    try {
      const { name, wins, losses } = req.body;
      const peer = await PeerService.addPeer(name, wins, losses);
      res.status(201).json(peer);
    } catch (error) {
      res.status(500).json({ error: 'Error creating peer', message: error.message });
    }
  }

  static async getPeers(req, res) {
    try {
      const peers = await PeerService.getAllPeers();
      res.status(200).json(peers);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching peers', message: error.message });
    }
  }
}

module.exports = PeerController;
