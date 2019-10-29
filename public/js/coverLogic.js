function sleepProjects(projects) {
    for (let i = 0; i < projects.length; i++) {
      projects[i].sleep();
    }
  }

  function wakeProjects(projects) {
    for (let i = 0; i < projects.length; i++) {
      projects[i].awake();
    }
  }

  function sleepNav() {
    sleepProjects(projectObjs);
  }
  let displayCover = document.getElementById("display-cover");
  function sleepDisplay() {
    displayCover.classList.add("sleep");
  }

  let navCover = document.getElementById("nav-cover");
  function expandNavCover() {
    navCover.style.display = "";
  }
  function collapseNavCover() {
    navCover.style.display = "none";
  }

  function expandDisplayCover() {
    displayCover.style.display = "";
  }
  function collapseDisplayCover() {
    displayCover.style.display = "none";
  }

  function wakeNav() {
    // Awaken all project
    wakeProjects(projectObjs);
  }

  function wakeDisplay() {
    // Awaken the display
    displayCover.classList.remove("sleep");
  }

  navCover.onmouseenter = function() {
    collapseNavCover();
    wakeNav();
    sleepDisplay();
    // expandDisplayCover(); // Need to figure out how to handle this better
  };

  displayCover.onmouseenter = function() {
    // collapseDisplayCover();
    wakeDisplay();
    sleepNav();
    expandNavCover();
  }

  // Start with all projects asleep
  sleepNav();
  wakeDisplay();
  expandDisplayCover();