// @ts-nocheck
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Circle,
  LinearScale,
  Settings,
  Psychology,
} from '@mui/icons-material';

export const ConfigList = ({ handleMenuClick, menuOpenHandler }) => {
  return <>
    <List
      sx={{ width: '100%' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <ListItemButton onClick={() => handleMenuClick('general')}>
        <ListItemIcon>
          <Settings color="primary" />
        </ListItemIcon>
        <ListItemText primary='General' />
        {menuOpenHandler.general ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </ListItemButton>
      <Collapse in={menuOpenHandler.general} timeout='auto' unmountOnExit>
        <Divider />
        <ul>
          <li>No license key was used for development</li>
          <li>There are 10k nodes, and 5k links. 1 link between every two nodes</li>
          <li>Press ctrl+z to undo any changes</li>
          <li>Press ctrl+y to redo any changes</li>
          <li>Changing the dropdown value will highlight and focus on the selected node</li>
          <li>Clicking outside the node will clear its highlight</li>
          <li>Any change will trigger the saving icon for 5 seconds</li>
          <li>Any editing will not update the label</li>
          <li>Libraries: GoJS, and GoJS-React for the diagram; Material-UI for this list; Icons-Material for every icon</li>
        </ul>
        <Divider />
      </Collapse>
      <ListItemButton onClick={() => handleMenuClick('nodes')}>
        <ListItemIcon>
          <Circle color="primary" />
        </ListItemIcon>
        <ListItemText primary='Nodes' />
        {menuOpenHandler.nodes ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </ListItemButton>
      <Collapse in={menuOpenHandler.nodes} timeout='auto' unmountOnExit>
        <Divider />
        <ul>
          <li>All nodes have the circle shape added</li>
          <li>All nodes have randomly generated colors</li>
          <li>All nodes have their own key as an unique label</li>
          <li>It's possible to reposition any node. Click and hold on the node <b>text</b>, and drop it at the desired location</li>
          <li>It's possible to adjust any node. Click anywhere on the node, and adjust to the desired height/width</li>
          <li>Press delete to delete any selected node</li>
          <li>Right-click at any node to double its font-size</li>
        </ul>
        <Divider />
      </Collapse>
      <ListItemButton onClick={() => handleMenuClick('links')}>
        <ListItemIcon>
          <LinearScale color="primary" />
        </ListItemIcon>
        <ListItemText primary='Links' />
        {menuOpenHandler.links ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </ListItemButton>
      <Collapse in={menuOpenHandler.links} timeout='auto' unmountOnExit>
        <Divider />
        <ul>
          <li>All links have their linked nodes as an unique label</li>
          <li>It's possible to change any link. Select the link, drag the red dot and drop it at the desired node</li>
          <li>It's possible to adjust any link. Select them and drag the blue dot, this will create 2 more adjustable dots</li>
          <li>It's possible to create a new link. Drag (outside the text) on any node and drop it at the desired node</li>
          <li>Press delete to delete any selected link</li>
        </ul>
        <Divider />
      </Collapse>
      <ListItemButton onClick={() => handleMenuClick('observations')}>
        <ListItemIcon>
          <Psychology color="primary" />
        </ListItemIcon>
        <ListItemText primary='Observations' />
        {menuOpenHandler.observations ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </ListItemButton>
      <Collapse in={menuOpenHandler.observations} timeout='auto' unmountOnExit>
        <Divider />
        <ul>
          <li>Tried to do everything as simple as I could</li>
          <li>This took me about 14 hours</li>
        </ul>
      </Collapse>
    </List>
  </>
}

export default ConfigList;
