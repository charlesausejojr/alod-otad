import Peer from "../models/peerModel.js";

class PeerService {
  static async addPeer(name, wins, losses) {
    const newPeer = new Peer({ name, wins, losses });
    return await newPeer.save();
  }

  static async getAllPeers() {
    return await Peer.find();
  }
}

module.exports = PeerService;
