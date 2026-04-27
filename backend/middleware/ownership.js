import Playlist from '../models/Playlist.js';

export const isPlaylistOwner = async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) {
    console.error('Ownership: Playlist not found');
    return res.status(404).json({ error: 'Playlist not found' });
  }
  if (!playlist.owner || !playlist.owner.equals(req.user._id)) { //Kanske ska byta till owner
    console.error('Ownership: Not authorized to modify this playlist');
    return res.status(403).json({ error: 'Not authorized to modify this playlist' });
  }
  req.playlist = playlist;
  next();
};

/**
 * Placeholder for extension work (playlist sharing). Not wired to any route yet.
 * Implement authorization for “shared with me” access when you add those routes;
 * until then, leaving this empty is intentional—see docs/SHARE_SYSTEM.md.
 */
export const isPlaylistSharedWithUser = async (req, res, next) => {
  // TODO: Implement this (student / course extension)
  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) {
    console.error('Ownership: Shared Playlist not found');
    return res.status(404).json({ error: 'Playlist not found' });
  }

  const isUserInList = playlist.users.some(userId => userId.equals(req.user._id));

  if (!isUserInList && playlist.owner.toString() !== (req.user._id.toString())) {
    console.error('Ownership: Not authorized to see this playlist');
    return res.status(403).json({ error: 'Not authorized to see this playlist' });
  }
  req.playlist = playlist;
  next();
};
