const Articles = {
    async save(articleId, saved) {
      const url = `/api/articles/${articleId}`
      try {
        await axios.put(url, { saved: !saved })
        window.location.reload()
      } catch (error) {
        alert('Failed to save article!')
      }
    },
    async deleteNote(id) {
      const url = `/api/articles/notes/${id}`
      try {
        await axios.delete(url)
        window.location.reload()
      } catch (error) {
        alert('Failed to delete note!')
        console.error(error)
      }
    },
  }
  
  window.Articles = Articles