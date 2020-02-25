;(function() {
    const scrapeButton = document.getElementById('scrape')
    const clearButton = document.getElementById('clear')
  
    function addSpinner(element, type = 'success') {
      element.innerHTML = ''
      const spinner = document.createElement('div')
      spinner.classList.add('spinner-border', `text-${type}`)
      element.appendChild(spinner)
    }
  
    scrapeButton.onclick = async () => {
      addSpinner(scrapeButton)
  
      try {
        await axios.post('/api/scrape')
      } catch (error) {
        alert('Failed to scrape!')
        console.error(error)
      }
  
      window.location = '/'
    }
  
    clearButton.onclick = async () => {
      addSpinner(clearButton, 'danger')
  
      try {
        await axios.delete('/api/articles')
      } catch (error) {
        alert('Failed to clear!')
        console.error(error)
      }
  
      window.location = '/'
    }
  })()