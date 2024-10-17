import PeerService from "../services/peerService.js";

class PeerController {
  static async createPeer(req, res) {
    try {
      const { steamId, name, wins, losses, img } = req.body;
      const peer = await PeerService.addPeer(steamId, name, wins, losses, img);
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

  static async deletePeer (req, res) {
    try {
      const { steamId } = req.params;
      const deletedPeer = await PeerService.deletePeerById(steamId);
      res.status(200).json({ message: 'Peer deleted successfully', peer: deletedPeer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static async updatePeer (req, res) {
    try {
      const { steamId } = req.params;
      const updatedPeer = await PeerService.updatePeerById(steamId, req.body);
  
      if (!updatedPeer) {
        return res.status(404).json({ error: 'Peer not found.' });
      }
  
      res.status(200).json(updatedPeer);
    } catch (error) {
      console.error('Error updating peer:', error);
      res.status(500).json({ error: 'Failed to update peer.' });
    }
  };
}

export default PeerController;
