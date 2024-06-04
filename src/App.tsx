// @ts-nocheck
import { useState, useRef } from 'react';
import './App.css';
import Diagram from './components/Diagram';
import Buttons from './components/Buttons';
import InfoList from './components/List';

function App() {
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleModelChange = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  const handleClickContextMenuButton = (obj) => {
    const diagram = diagramRef?.current?.getDiagram();
    const selectedNode = diagram.findNodeForKey(Number(obj.part.data.key));
    diagram.startTransaction('change text size');
    const graphObject = selectedNode.findObject('NODE');
    graphObject.scale *= 2;
    diagram.commitTransaction('change text size');
  }

  const handleDropdownChange = (e: Event) => {
    const diagram = diagramRef?.current?.getDiagram();
    const selectedNode = diagram.findNodeForKey(Number(e?.target?.value));
    diagram.startTransaction('highlight node');
    diagram.select(selectedNode);
    diagram.highlight(selectedNode);
    diagram.centerRect(selectedNode.actualBounds);
    diagram.commitTransaction('highlight node');
  }

  const handleMenuClick = (state) => {
    setMenuOpenHandler({
      ...menuOpenHandler,
      [state]: !menuOpenHandler[state]
    })
  }

  const clearSelection = () => {
    const diagram = diagramRef?.current?.getDiagram();
    diagram.startTransaction('clearSelection');
    diagram.clearSelection();
    diagram.clearHighlighteds();
    diagram.commitTransaction('clearSelection');
  }

  const diagramRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [menuOpenHandler, setMenuOpenHandler] = useState({
    general: true,
    nodes: true,
    links: true,
    observations: true,
  })
  const [initialData] = useState({
    node: [...Array(10000).keys()].map((key) => {
      return {
        key: key,
        text: key,
        color: generateRandomColor(),
        font: '1rem Roboto, sans-serif',
        loc: key % 2 === 0
          ? `0 ${key * 50}`
          : `200 ${(key - 1) * 50}`
      }
    }),
    link: [...Array(5000).keys()].map((key) => ({
      key: ((key + 1) * -1),
      from: key * 2,
      to: (key * 2) + 1,
      text: `${key * 2} to ${(key * 2) + 1}`,
      font: '1rem Roboto, sans-serif'
    }))
  })

  return <>
    <div className='wrapper'>
      <div className='header'>
        <img src='/VB-logo.svg' alt='logo' className='vb-logo' />
        Frontend Development Assignment
      </div>
      <div className='content'>
        <div style={{ width: '50%' }}>
          <InfoList
            menuOpenHandler={menuOpenHandler}
            handleMenuClick={handleMenuClick}
          />
        </div>

        <div style={{ width: '50%' }}>
          <Buttons
            loading={loading}
            initialData={initialData}
            handleDropdownChange={handleDropdownChange}
          />
          <Diagram
            diagramRef={diagramRef}
            initialData={initialData}
            clearSelection={clearSelection}
            handleModelChange={handleModelChange}
            handleClickContextMenuButton={handleClickContextMenuButton}
          />
        </div>
      </div>
    </div>
  </>
}

export default App;
