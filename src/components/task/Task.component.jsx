import { useContext, useState, useMemo } from "react";
import { TaskContext } from "../../context/Task.context.js";

const TaskComponent = () => {
  const { state, dispatch } = useContext(TaskContext);

  const [confirmedCheck, setConfirmedCheck] = useState(false);
  const [wallet, setWallet] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingTasks, setLoadingTasks] = useState([]); // track tasks currently in progress

  const totalRequiredTasks = 3;

  // Progress %
  const progress = useMemo(() => {
    return (state.completedTasks.length / totalRequiredTasks) * 100;
  }, [state.completedTasks]);

  // Handle Task Click (disable after done)
  const handleTaskClick = (taskNumber) => {
    if (!state.completedTasks.includes(taskNumber) && !loadingTasks.includes(taskNumber)) {
      // mark as loading for this task
      setLoadingTasks((prev) => [...prev, taskNumber]);

      // simulate task completion after 10–15 seconds
      const delay = Math.floor(Math.random() * 5000) + 10000 // 10-15 seconds
      setTimeout(()=>{
        dispatch({ type: "COMPLETE_TASK", payload: taskNumber })
        setLoadingTasks(prev => prev.filter(t => t !== taskNumber))
      }, delay)

      // dispatch({ type: "COMPLETE_TASK", payload: taskNumber });
    }
  };

  // Wallet validation
  const isWalletValid = /^0x[a-fA-F0-9]{40}$/.test(wallet);

  const canSubmit = state.completedTasks.length >= totalRequiredTasks && confirmedCheck && isWalletValid && twitterHandle.length > 2;

  // Submit to Google Sheet
  const submitToSheet = async () => {
    setError("");
    setSuccess("");

    if (!canSubmit) {
      setError("Please complete all required tasks correctly.");
      return;
    }

    try {
      setLoading(true);

      // const response = await fetch(
      //   "https://script.google.com/macros/s/AKfycbwii2crMioWE2OqNzh4p-dskkxI4mQpcS7_siyQhAEn-rC465TD_UW73P6GQ08kK_rB/exec",
      //   {
      //     method: "POST",
      //     body: new URLSearchParams({
      //       wallet,
      //       twitterHandle,
      //     })
      //   }
      // );

      // const response = await fetch(
      //   "https://script.google.com/macros/s/AKfycbwii2crMioWE2OqNzh4p-dskkxI4mQpcS7_siyQhAEn-rC465TD_UW73P6GQ08kK_rB/exec",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       twitterHandle,
      //       wallet,
      //     }),
      //   }
      // );
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwii2crMioWE2OqNzh4p-dskkxI4mQpcS7_siyQhAEn-rC465TD_UW73P6GQ08kK_rB/exec?twitterHandle=${encodeURIComponent(
          twitterHandle
        )}&wallet=${encodeURIComponent(wallet)}`
      );

      const result = await response.json();

      if (result.status === "success") {
        setSuccess("Successfully submitted 🎉");
        setWallet("");
        setTwitterHandle("");
        setConfirmedCheck(false);
      } else {
        setError("Submission failed.");
      }
    } catch (err) {
      setError("Network error. Try again.");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <div className="airdrop-card p-4 p-md-5">

            {/* Header */}
            <div className="text-center mb-4">
              <h4 className="fw-bold text-uppercase mb-2">
                Gubby Whitelist Tasks
              </h4>
              <p className="text-muted small mb-0">
                Complete all steps to unlock submission
              </p>
            </div>

            {/* Progress Bar */}
            <div className="progress mb-4">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* TASKS */}
            <div className="task-grid">

              {/* Task 1 */}
              <div className="task-card">
                <div className="task-left">
                  <span className="task-number">01</span>
                  <div className="task-title">Follow Gubby X account</div>
                </div>
                <a href="https://x.com/gubyverse?s=21" target="_blank" rel="noopener noreferrer" className="btn task-btn" onClick={() => handleTaskClick(1)} style={{ pointerEvents: state.completedTasks.includes(1) ? "none" : "auto", opacity: state.completedTasks.includes(1) ? 0.6 : 1,
                  }}>
                  {state.completedTasks.includes(1)
                    ? "Done ✓"
                    : loadingTasks.includes(1)
                    ? "Checking..."   // show loader text while waiting
                    : "Go"
                  }
                </a>
              </div>

              {/* Task 2 */}
              <div className="task-card">
                <div className="task-left">
                  <span className="task-number">02</span>
                  <div className="task-title">Follow founder account</div>
                </div>
                <a href="https://x.com/stillpushingg?s=21" target="_blank" rel="noopener noreferrer" className="btn task-btn" onClick={() => handleTaskClick(2)} style={{ pointerEvents: state.completedTasks.includes(2) ? "none" : "auto", opacity: state.completedTasks.includes(2) ? 0.6 : 1,
                  }}>
                  {state.completedTasks.includes(2)
                    ? "Done ✓"
                    : loadingTasks.includes(2)
                    ? "Loading..."
                    : "Go"
                  }
                </a>
              </div>

              {/* Task 3 */}
              <div className="task-card">
                <div className="task-left">
                  <span className="task-number">03</span>
                  <div className="task-title">Like, RT & Tag 3 friends</div>
                </div>
                <button className="btn task-btn" onClick={() => handleTaskClick(3)} disabled={state.completedTasks.includes(3)}>
                  {state.completedTasks.includes(3)
                    ? "Done ✓"
                    : loadingTasks.includes(3)
                    ? "Loading..."
                    : "Go"
                  }
                </button>
              </div>

              {/* Task 4: Confirmation */}
              <div className="task-card">
                <div className="task-left">
                  <span className="task-number">04</span>
                  <div className="task-title">Are you a gubbler?</div>
                </div>
                <div className="radio-group">
                  <label className="radio-option">
                    <input type="radio" name="gubbler" onChange={() => setConfirmedCheck(true)} checked={confirmedCheck}/>
                    <span>Yes</span>
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="gubbler" onChange={() => setConfirmedCheck(false)} checked={!confirmedCheck}/>
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* FORM SECTION */}
            <div className="form-section mt-5">
              <div className="mb-3">
                <label className="form-label text-uppercase small">
                  Your X Handle
                </label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input type="text" className={`form-control ${ twitterHandle.length > 0 && twitterHandle.length <= 2 ? "is-invalid" : "" }`} value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} placeholder="your_handle"/>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-uppercase small">
                  Your EVM Address
                </label>
                <input type="text" className={`form-control ${ wallet && !isWalletValid ? "is-invalid" : "" }`} value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="Paste Wallet Address Here..."/>
                <small className="text-muted">ETH Network</small>
              </div>
            </div>

            {/* Error / Success */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}

            {/* Submit Button */}
            <button className="btn complete-btn1 w-100 mt-4" disabled={!canSubmit || loading} onClick={submitToSheet}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                "Complete"
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;