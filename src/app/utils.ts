export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * A node for priorioty linked list / stack and such
 */
class PriorityNode {
  key: string;
  priority: number;

  constructor(key: string, priority: number) {
    this.key = key;
    this.priority = priority;
  }
}

/**
 * A priority queue with highest priority always on top
 * This queue is sorted by priority for each enqueue
 */
class PriorityQueue {

  nodes: PriorityNode[] = [];

  /**
   * Enqueue a new node
   * @param {[type]} priority
   * @param {[type]} key
   */
  enqueue(priority: number, key: string) {
    this.nodes.push(new PriorityNode(key, priority));
    this.nodes.sort(
      function (a, b) {
        return a.priority - b.priority;
      }
    );
  }

  /**
   * Dequeue the highest priority key
   */
  dequeue() {
    return this.nodes.shift();
  }

  /**
   * Checks if empty
   */
  empty(): boolean {
    return !this.nodes.length;
  }
}

export function shortestPath(vertices: any, start: string, finish: string, keyProp: string, nameProp: string) {

  const nodes = new PriorityQueue(),
    distances = {},
    previous = {},
    path = [];

  // Init the distances and queues variables
  for (const vertex of Object.keys(vertices)) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(0, vertex);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(Infinity, vertex);
    }

    previous[vertex] = null;
  }

  // continue as long as the queue haven't been emptied.
  while (!nodes.empty()) {

    const node = nodes.dequeue();
    let smallest = node.key;

    // we are the last node
    if (smallest === finish) {

      // Compute the path
      while (previous[smallest]) {
        path.push(previous[smallest]);
        smallest = previous[smallest][nameProp];
      }
      break;
    }

    // No distance known. Skip.
    if (!smallest || distances[smallest] === Infinity) {
      continue;
    }

    // Compute the distance for each neighbor
    for (const neighbor of Object.keys(vertices[smallest])) {
      const alt = distances[smallest] + vertices[smallest][neighbor][keyProp];

      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = vertices[smallest][neighbor];
        nodes.enqueue(alt, neighbor);
      }
    }
  }
  return path.reverse();
}
