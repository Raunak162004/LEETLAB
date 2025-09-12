import React, { useEffect, useState } from "react";
import { X, Plus, Loader } from "lucide-react";
import { usePlayListStore } from "../store/usePlayListStore";
import CreatePlayListModel from "./CreatePlayListModel";


const AddToPlayListModel = ({ isOpen, onClose, problemId }) => {
  const {
    playlists,
    isLoading,
    getAllPlayLists,
    addProblemToPlaylist,
    createPlayList,
  } = usePlayListStore();

  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  useEffect(() => {
    getAllPlayLists();
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;
    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };
  const handleCreatePlayList = async (data) => {
    await createPlayList(data);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h3 className="text-xl font-bold">Add to Playlist</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-2">
                Select Playlist
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-2 mt-7">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-outline"
            >
              Cancel
            </button>
            <div className="flex flex-row ml-10 gap-2 ">
              <button
                className="btn btn-primary btn-outline gap-2"
                onClick={() => {
                  setIsCreateModelOpen(true);
                }}
              >
                Create Playlist
              </button>
              <CreatePlayListModel
                isOpen={isCreateModelOpen} //value of clicked button
                onClose={() => setIsCreateModelOpen(false)}
                onSubmit={handleCreatePlayList} //sending data to backend
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!selectedPlaylist || isLoading}
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Add to Playlist
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlayListModel;