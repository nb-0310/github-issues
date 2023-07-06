document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const loadPrevButton = document.getElementById("load_prev");
  const loadNextButton = document.getElementById("load_next");
  const issueList = document.getElementById("issue-list");
  const pageHeading = document.getElementById("page-heading");

  const fetchIssues = async (pageNumber) => {
    const url = `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`;

    try {
      const response = await fetch(url);
      const issues = await response.json();
      displayIssues(issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const displayIssues = (issues) => {
    issueList.innerHTML = "";

    issues.forEach((issue) => {
      const issueItem = document.createElement("li");
      issueItem.textContent = issue.title;
      issueList.appendChild(issueItem);
    });
  };

  const updatePageHeading = (pageNumber) => {
    pageHeading.textContent = `Page number ${pageNumber}`;
  };

  const loadPrevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchIssues(currentPage);
      updatePageHeading(currentPage);
      loadNextButton.disabled = false;
    }

    if (currentPage === 1) {
      loadPrevButton.disabled = true;
    }
  };

  const loadNextPage = () => {
    currentPage++;
    fetchIssues(currentPage);
    updatePageHeading(currentPage);
    loadPrevButton.disabled = false;
  };

  loadPrevButton.addEventListener("click", loadPrevPage);
  loadNextButton.addEventListener("click", loadNextPage);

  fetchIssues(currentPage);
});
