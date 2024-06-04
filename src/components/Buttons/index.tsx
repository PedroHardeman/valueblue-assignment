// @ts-nocheck
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';

export const Buttons = ({ loading, initialData, handleDropdownChange }) => {
  return <>
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading
          ? <><SyncIcon color="primary" />Saving</>
          : <><CheckCircleIcon color="primary" /> Saved</>
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <select onChange={handleDropdownChange}>
          {initialData.node.map(node => <option key={node.key} value={node.key}>{node.text}</option>)}
        </select>
      </div>
    </div>
  </>
}

export default Buttons;
