// @ts-nocheck
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

export const Diagram = ({
  diagramRef,
  initialData,
  clearSelection,
  handleModelChange,
  handleClickContextMenuButton,
}) => {
  const initDiagram = () => {
    const diagram =
      new go.Diagram({
        'undoManager.isEnabled': true,
        'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
        'draggingTool.isGridSnapEnabled': true,
        'linkingTool.portGravity': 20,
        'relinkingTool.portGravity': 20,
        'relinkingTool.fromHandleArchetype': new go.Shape('Diamond', {
          segmentIndex: 0,
          cursor: 'pointer',
          desiredSize: new go.Size(8, 8),
          fill: 'tomato',
          stroke: 'darkred',
        }),
        'relinkingTool.toHandleArchetype': new go.Shape('Diamond', {
          segmentIndex: -1,
          cursor: 'pointer',
          desiredSize: new go.Size(8, 8),
          fill: 'darkred',
          stroke: 'tomato',
        }),
        'linkReshapingTool.handleArchetype': new go.Shape('Diamond', {
          desiredSize: new go.Size(7, 7),
          fill: 'lightblue',
          stroke: 'deepskyblue'
        }),
        'rotatingTool.handleAngle': 270,
        'rotatingTool.handleDistance': 30,
        'rotatingTool.snapAngleMultiple': 15,
        'rotatingTool.snapAngleEpsilon': 15,
        click: clearSelection
      });

    diagram.nodeTemplate =
      new go.Node('Auto', {
        resizable: true,
        selectionObjectName: 'NODE',
        contextMenu: go.GraphObject.build('ContextMenu')
          .add(
            go.GraphObject.build('ContextMenuButton',
              { click: (e, obj) => handleClickContextMenuButton(obj) }
            )
              .add(new go.TextBlock('2x font-size'))
          )
      })
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
        .add(
          new go.Shape('Circle', {
            name: 'SHAPE',
            strokeWidth: 1,
            portId: '',
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer'
          })
            .bind('fill', 'color')
            .bindObject('stroke', 'isHighlighted', h => h ? 'red' : 'black')
            .bindObject('strokeWidth', 'isHighlighted', h => h ? 5 : 1),
          new go.TextBlock({ name: 'NODE', margin: 8, editable: false })
            .bindTwoWay('text')
            .bindTwoWay('font')
        );

    diagram.linkTemplate =
      new go.Link({
        reshapable: true,
        resegmentable: true,
        relinkableFrom: true,
        relinkableTo: true,
        adjusting: go.LinkAdjusting.Stretch
      })
        .bindTwoWay('points')
        .bindTwoWay('fromSpot', 'fromSpot', go.Spot.parse, go.Spot.stringify)
        .bindTwoWay('toSpot', 'toSpot', go.Spot.parse, go.Spot.stringify)
        .add(
          new go.Shape({ toArrow: 'Standard' }),
          new go.TextBlock()
            .bindTwoWay('text')
            .bindTwoWay('font')
        );

    return diagram;
  }

  return <>
    <ReactDiagram
      ref={diagramRef}
      initDiagram={initDiagram}
      divClassName='diagram-component'
      nodeDataArray={initialData.node}
      linkDataArray={initialData.link}
      onModelChange={handleModelChange}
    />
  </>
}

export default Diagram;
