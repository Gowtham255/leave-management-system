// Function to apply for leave
function applyLeave() {
    const leaveType = document.getElementById("leaveType").value;
    const leaveDays = parseInt(document.getElementById("leaveDays").value);
    if (!leaveDays || leaveDays <= 0) {
    alert("Please enter a valid number of leave days.");
    return;
    }
    let leaveBalance = getLeaveBalance();
    if (!leaveBalance[leaveType]) {
    leaveBalance[leaveType] = 0;
    }
    if (leaveBalance[leaveType] + leaveDays > 30) {
    alert("Insufficient leave balance. You cannot apply for more than 30 days in total.");
    return;
    }
    leaveBalance[leaveType] += leaveDays;
    setLeaveBalance(leaveBalance);
    updateLeaveDisplay();
   }
   // Function to get leave balance from local storage
   function getLeaveBalance() {
    const leaveBalanceStr = localStorage.getItem("leaveBalance");
    if (leaveBalanceStr) {
    return JSON.parse(leaveBalanceStr);
    }
    return {};
   }
   // Function to set leave balance in local storage
   function setLeaveBalance(leaveBalance) {
    localStorage.setItem("leaveBalance", JSON.stringify(leaveBalance));
   }
   // Function to update the leave display on the UI
   function updateLeaveDisplay() {
    const leaveBalance = getLeaveBalance();
    const casualLeaveTaken = leaveBalance.casual ? leaveBalance.casual : 0;
    const medicalLeaveTaken = leaveBalance.medical ? leaveBalance.medical : 0;
    const casualLeaveRemaining = 10 - casualLeaveTaken; // Assuming 10 casual leave days allowed
    const medicalLeaveRemaining = 20 - medicalLeaveTaken; // Assuming 20 medical leave days allowed
    document.getElementById("casualLeaveDays").textContent = casualLeaveRemaining;
    document.getElementById("medicalLeaveDays").textContent = medicalLeaveRemaining;
   }
   // Load leave balance on page load
   window.onload = function() {
    updateLeaveDisplay();
   }
