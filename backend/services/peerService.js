import Peer from "../models/peerModel.js";

class PeerService {
  static async addPeer(steamId, name, wins, losses, img) {
    const newPeer = new Peer({ steamId, name, wins, losses, img });
    return await newPeer.save();
  }

  static async getAllPeers() {
    return await Peer.find();
  }

  static async deletePeerById(steamId){
    return await Peer.findOneAndDelete({ steamId });
  }

  static async updatePeerById (steamId, updatedData) {
    return await Peer.findOneAndUpdate(
      { steamId }, 
      updatedData, {
        new: true,
        runValidators: true,
    });
  };
}

export default PeerService;
