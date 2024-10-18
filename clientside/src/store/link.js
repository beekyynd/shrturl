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
}));