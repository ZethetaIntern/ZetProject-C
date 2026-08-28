import { Modal } from "./Modal";
import { Button } from "./Button";
import { useState } from "react";
const meta = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"]
};
export default meta;
export const Default = {
  render: () => {
    const [open, setOpen] = useState(false);
    return <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Portfolio Configuration Settings"
      footerActions={<>
              <Button onClick={() => setOpen(false)} variant="secondary">Cancel</Button>
              <Button onClick={() => setOpen(false)} variant="primary">Save Changes</Button>
            </>}
    >
          <div>
            <p className="mb-4">Configure the dashboard parameters for Meridian Capital:</p>
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Risk tolerance limit</label>
            <input type="number" defaultValue={15} className="w-full px-2 py-1 bg-[var(--bg-dashboard)] border border-[var(--border-color)] rounded mb-3" />
          </div>
        </Modal>
      </div>;
  }
};
