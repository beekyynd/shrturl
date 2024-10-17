import { create } from "zustand";

export const useLinkStore = create((set) => ({
    
	links: [],

	setLinks: (links) => set({ links }),
    
	createLink: async (newLink) => {

		if (!newLink.url) {

			return { success: false, message: "Please fill in all fields." };

		}

		const res = await fetch("/api/links", {

			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLink),
		});

		const data = await res.json();

		set((state) => ({ links: [...state.links, data.data] }));

		return { success: true, message: "Link Shortened successfully" };

	},

	fetchLinks: async () => {

		const res = await fetch("/api/links");

		const data = await res.json();

		set({ Links: data.data });

	},

    redirectToTarget: async (short) => {

        try {

          const res = await fetch(`/api/links/${short}`);
      
          if (!res.ok) {

            throw new Error("Failed to fetch link.");

          }
      
          const data = await res.json();
      
          if (data?.data?.url) {

            // Redirect the user to the target URL if it exists

            window.location.href = data.data.url;

          } else {

            console.error("No target URL found for this short link.");

          }

        } catch (error) {

          console.error("An error occurred while fetching the link:", error);

        }
      },

	deleteLink: async (pid) => {

		const res = await fetch(`/api/links/${pid}`, {

			method: "DELETE",

		});

		const data = await res.json();

		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh

		set((state) => ({ links: state.links.filter((link) => link._id !== pid) }));

		return { success: true, message: data.message };
	},

	updateLink: async (pid, updatedLink) => {

		const res = await fetch(`/api/links/${pid}`, {
            
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedLink),
		});

		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			links: state.links.map((link) => (link._id === pid ? data.data : link)),
		}));

		return { success: true, message: data.message };
	},
}));