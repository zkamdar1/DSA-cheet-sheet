"use client"

import { DiagramBox } from "@/components/DiagramBox"
import { CodeBlock } from "@/components/CodeBlock"
import { useHashNavigation } from "@/lib/use-hash-navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DataStructuresPage() {
  const { activeTab, setActiveTab } = useHashNavigation("arrays")
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Data Structures</h1>
        <p className="text-muted-foreground">
          Core data structures, implementations, and time complexities.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center justify-start">
          <TabsTrigger value="arrays">Arrays</TabsTrigger>
          <TabsTrigger value="linked-lists">Linked Lists</TabsTrigger>
          <TabsTrigger value="stacks">Stacks</TabsTrigger>
          <TabsTrigger value="queues">Queues</TabsTrigger>
          <TabsTrigger value="hash-tables">Hash Tables</TabsTrigger>
          <TabsTrigger value="trees">Trees</TabsTrigger>
          <TabsTrigger value="graphs">Graphs</TabsTrigger>
          <TabsTrigger value="heaps">Heaps</TabsTrigger>
        </TabsList>
        
        {/* Array Content */}
        <TabsContent value="arrays" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Arrays</CardTitle>
              <CardDescription>
                A collection of elements stored at contiguous memory locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    Arrays are the most basic and widely used data structure. They store elements of the same type in contiguous memory locations, allowing for constant-time access to any element using its index.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Characteristics</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Fixed size in most languages (though dynamic in Python, JavaScript)</li>
                      <li>Elements accessed by index in constant time O(1)</li>
                      <li>Elements stored in contiguous memory locations</li>
                      <li>Can be single-dimensional or multi-dimensional</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Array Structure"
                    diagram={`
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  5  │  ← Indices
├─────┼─────┼─────┼─────┼─────┼─────┤
│ 10  │ 20  │ 30  │ 40  │ 50  │ 60  │  ← Values
└─────┴─────┴─────┴─────┴─────┴─────┘
   ↑                             ↑
 Index 0                      Index 5
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Access by index</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert/Delete at end</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert/Delete at beginning/middle</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Search (unsorted array)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Search (sorted array - binary search)</td>
                            <td className="px-4 py-2">O(log n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Python Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`# Python has built-in lists which function as dynamic arrays
nums = [10, 20, 30, 40, 50]

# Access: O(1)
print(nums[2])  # Output: 30

# Insertion at end: O(1) amortized
nums.append(60)  # [10, 20, 30, 40, 50, 60]

# Insertion at index: O(n)
nums.insert(1, 15)  # [10, 15, 20, 30, 40, 50, 60]

# Deletion at end: O(1)
nums.pop()  # [10, 15, 20, 30, 40, 50]

# Deletion at index: O(n)
del nums[1]  # [10, 20, 30, 40, 50]

# Search: O(n)
index = nums.index(30) if 30 in nums else -1  # index = 2

# Length: O(1)
length = len(nums)  # length = 5
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Storing and accessing sequential data</li>
                      <li>Temporary storage of objects</li>
                      <li>Buffer for operations like file I/O</li>
                      <li>Lookup tables and sparse matrices</li>
                      <li>Dynamic programming problems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Arrays</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need constant-time access to elements</li>
                      <li>When the number of elements is known (or has an upper bound)</li>
                      <li>When memory usage needs to be predictable</li>
                      <li>When iterating through all elements is a frequent operation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Arrays</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When the size of data is unknown or highly variable</li>
                      <li>When frequent insertions/deletions are needed at arbitrary positions</li>
                      <li>When memory is constrained and the array may be sparse</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Linked List Content */}
        <TabsContent value="linked-lists" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Linked Lists</CardTitle>
              <CardDescription>
                A linear data structure where elements are stored in nodes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    Linked lists are linear data structures where elements are stored in nodes. Each node contains a data value and a reference (or pointer) to the next node in the sequence.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Characteristics</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Dynamic size - can grow or shrink during execution</li>
                      <li>Non-contiguous memory allocation</li>
                      <li>Efficient insertions and deletions</li>
                      <li>Sequential access (no random access)</li>
                      <li>Can be singly linked, doubly linked, or circular</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Singly Linked List"
                    diagram={`
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│     head     │      │              │      │              │      │     tail     │
│   ┌──────┐   │      │   ┌──────┐   │      │   ┌──────┐   │      │   ┌──────┐   │
│   │  10  │   │──────┼──▶│  20  │   │──────┼──▶│  30  │   │──────┼──▶│  40  │   │
│   └──────┘   │      │   └──────┘   │      │   └──────┘   │      │   └──────┘   │
│       │      │      │       │      │      │       │      │      │       │      │
│       ▼      │      │       ▼      │      │       ▼      │      │       ▼      │
│   ┌──────┐   │      │   ┌──────┐   │      │   ┌──────┐   │      │   ┌──────┐   │
│   │ next │───┼──────┼──▶│ next │───┼──────┼──▶│ next │───┼──────┼──▶│ NULL │   │
│   └──────┘   │      │   └──────┘   │      │   └──────┘   │      │   └──────┘   │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
`}
                  />

                  <DiagramBox 
                    title="Doubly Linked List"
                    diagram={`
┌───────────────────┐         ┌───────────────────┐         ┌───────────────────┐
│       head        │         │                   │         │       tail        │
│    ┌─────────┐    │         │    ┌─────────┐    │         │    ┌─────────┐    │
│    │  NULL   │◀───┼─────────┼────│   prev  │◀───┼─────────┼────│   prev  │    │
│    └─────────┘    │         │    └─────────┘    │         │    └─────────┘    │
│         ▲         │         │         ▲         │         │         ▲         │
│         │         │         │         │         │         │         │         │
│    ┌─────────┐    │         │    ┌─────────┐    │         │    ┌─────────┐    │
│    │   10    │    │         │    │   20    │    │         │    │   30    │    │
│    └─────────┘    │         │    └─────────┘    │         │    └─────────┘    │
│         │         │         │         │         │         │         │         │
│         ▼         │         │         ▼         │         │         ▼         │
│    ┌─────────┐    │         │    ┌─────────┐    │         │    ┌─────────┐    │
│    │  next   │────┼─────────┼───▶│  next   │────┼─────────┼───▶│  NULL   │    │
│    └─────────┘    │         │    └─────────┘    │         │    └─────────┘    │
└───────────────────┘         └───────────────────┘         └───────────────────┘
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Access (by index)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert/Delete at beginning</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert/Delete at end (with tail pointer)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert/Delete at middle (after finding position)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Search</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Python Implementation of Singly Linked List</h3>
                    <CodeBlock 
                      language="python"
                      code={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        
class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
        
    def is_empty(self):
        return self.head is None
        
    # Insert at beginning: O(1)
    def insert_at_beginning(self, data):
        new_node = Node(data)
        if self.is_empty():
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        self.size += 1
        
    # Insert at end: O(1) with tail pointer
    def insert_at_end(self, data):
        new_node = Node(data)
        if self.is_empty():
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1
        
    # Delete from beginning: O(1)
    def delete_from_beginning(self):
        if self.is_empty():
            return None
        data = self.head.data
        self.head = self.head.next
        self.size -= 1
        if self.head is None:
            self.tail = None
        return data
        
    # Search: O(n)
    def search(self, data):
        current = self.head
        position = 0
        while current:
            if current.data == data:
                return position
            current = current.next
            position += 1
        return -1
        
    # Get size: O(1)
    def get_size(self):
        return self.size
        
    # Display list: O(n)
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return elements

# Example usage
ll = LinkedList()
ll.insert_at_beginning(10)
ll.insert_at_end(20)
ll.insert_at_end(30)
print(ll.display())  # [10, 20, 30]
print(ll.search(20))  # 1
ll.delete_from_beginning()
print(ll.display())  # [20, 30]
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Implementing stacks and queues</li>
                      <li>Dynamic memory allocation</li>
                      <li>Hash tables (for collision resolution)</li>
                      <li>Adjacency lists for graph representation</li>
                      <li>LRU cache implementation</li>
                      <li>Undo functionality in applications</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Linked Lists</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need fast insertions/deletions</li>
                      <li>When the size of data is unknown or highly variable</li>
                      <li>When random access is not required</li>
                      <li>When memory limitations require non-contiguous storage</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Linked Lists</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When random access is frequently needed</li>
                      <li>When memory overhead is a concern (pointers add overhead)</li>
                      <li>When cache performance is critical (non-contiguous memory affects cache efficiency)</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      
        {/* Stacks Content */}
        <TabsContent value="stacks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Stacks</CardTitle>
              <CardDescription>
                A linear data structure that follows the Last-In-First-Out (LIFO) principle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are inserted and removed only from one end, called the top of the stack. Like a stack of plates, the last plate placed is the first to be removed.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Characteristics</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Follows LIFO (Last In, First Out) ordering</li>
                      <li>Elements are inserted and removed only from one end (top)</li>
                      <li>Main operations are push (insert) and pop (remove)</li>
                      <li>Can be implemented using arrays or linked lists</li>
                      <li>Access to elements other than the top is restricted</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Stack Structure"
                    diagram={`
      ┌────────────────────┐
      │       Stack        │
      └────────────────────┘
               │
               │ LIFO (Last In, First Out)
               ▼
┌─────────────────────────────┐
│                             │◀── Top (Access Point)
├─────────────────────────────┤
│            50               │ ← Last item pushed (will be popped first)
├─────────────────────────────┤
│            40               │
├─────────────────────────────┤
│            30               │
├─────────────────────────────┤
│            20               │
├─────────────────────────────┤
│            10               │ ← First item pushed (will be popped last)
└─────────────────────────────┘
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Push (Insert at top)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Pop (Remove from top)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Peek (View top element)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Search</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Check if empty</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Python Implementation Using List</h3>
                    <CodeBlock 
                      language="python"
                      code={`class Stack:
    def __init__(self):
        self.items = []
        
    def is_empty(self):
        return len(self.items) == 0
        
    # Push: O(1) amortized
    def push(self, item):
        self.items.append(item)
        
    # Pop: O(1)
    def pop(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.items.pop()
        
    # Peek: O(1)
    def peek(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.items[-1]
        
    # Size: O(1)
    def size(self):
        return len(self.items)

# Example usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

print(stack.peek())  # Output: 30
print(stack.pop())   # Output: 30
print(stack.size())  # Output: 2
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Python Implementation Using Linked List</h3>
                    <CodeBlock 
                      language="python"
                      code={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        self.top = None
        self.size = 0
        
    def is_empty(self):
        return self.top is None
        
    # Push: O(1)
    def push(self, data):
        new_node = Node(data)
        if self.top:
            new_node.next = self.top
        self.top = new_node
        self.size += 1
        
    # Pop: O(1)
    def pop(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        data = self.top.data
        self.top = self.top.next
        self.size -= 1
        return data
        
    # Peek: O(1)
    def peek(self):
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.top.data
        
    # Size: O(1)
    def get_size(self):
        return self.size

# Example usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

print(stack.peek())  # Output: 30
print(stack.pop())   # Output: 30
print(stack.get_size())  # Output: 2
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Expression evaluation and syntax parsing</li>
                      <li>Backtracking algorithms (maze solving, game trees)</li>
                      <li>Undo functionality in text editors and applications</li>
                      <li>Browser history (back button functionality)</li>
                      <li>Call stack for function calls in programming languages</li>
                      <li>Depth-First Search algorithm implementation</li>
                      <li>Balancing of symbols and parentheses matching</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Stacks</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need to process items in reverse order (LIFO)</li>
                      <li>When you need to track state during recursive algorithms</li>
                      <li>When implementing certain types of parsing algorithms</li>
                      <li>When you need simple undo functionality</li>
                      <li>When implementing depth-first algorithms</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Stacks</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need random access to elements</li>
                      <li>When you need to access elements in order of insertion (FIFO)</li>
                      <li>When you need to process elements based on priority</li>
                      <li>When searching operations are frequent</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Queues Content */}
        <TabsContent value="queues" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Queues</CardTitle>
              <CardDescription>
                A linear data structure that follows the First-In-First-Out (FIFO) principle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are inserted at the rear (enqueue) and removed from the front (dequeue). It's similar to a line of people waiting - the first person to join the line is the first to be served.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Characteristics</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Follows FIFO (First-In-First-Out) ordering</li>
                      <li>Elements are inserted at the rear and removed from the front</li>
                      <li>Main operations are enqueue (insert) and dequeue (remove)</li>
                      <li>Can be implemented using arrays or linked lists</li>
                      <li>Access to elements other than the front and rear is restricted</li>
                      <li>Variants include circular queues, double-ended queues (deque), and priority queues</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Queue Structure"
                    diagram={`
┌──────────────────────────────────────────────────────────┐
│                         Queue                            │
└──────────────────────────────────────────────────────────┘
             │                                    │
             │ FIFO (First In, First Out)         │
             ▼                                    ▼
┌─────────────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐
│                 │ │         │ │         │ │                 │
│      Front      │ │         │ │         │ │      Rear       │
│   (Dequeue)     │ │         │ │         │ │    (Enqueue)    │
│                 │ │         │ │         │ │                 │
└────────┬────────┘ └────┬────┘ └────┬────┘ └────────┬────────┘
         │               │           │               │
         ▼               ▼           ▼               ▼
┌─────────────┐    ┌─────────┐  ┌─────────┐    ┌─────────────┐
│     10      │──▶ │   20    │──▶│   30    │──▶ │     40      │
└─────────────┘    └─────────┘  └─────────┘    └─────────────┘
  First in,                                      Last in,
 first out                                      last out
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Enqueue (Insert at rear)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Dequeue (Remove from front)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Peek (View front element)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Search</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Check if empty</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Python Implementation Using List</h3>
                    <CodeBlock 
                      language="python"
                      code={`from collections import deque

class Queue:
    def __init__(self):
        # Using deque for efficient front operations
        self.items = deque()
        
    def is_empty(self):
        return len(self.items) == 0
        
    # Enqueue: O(1)
    def enqueue(self, item):
        self.items.append(item)
        
    # Dequeue: O(1)
    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.items.popleft()
        
    # Peek: O(1)
    def peek(self):
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.items[0]
        
    # Size: O(1)
    def size(self):
        return len(self.items)

# Example usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

print(queue.peek())    # Output: 10
print(queue.dequeue()) # Output: 10
print(queue.size())    # Output: 2
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Python Implementation Using Linked List</h3>
                    <CodeBlock 
                      language="python"
                      code={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
        self.size = 0
        
    def is_empty(self):
        return self.front is None
        
    # Enqueue: O(1)
    def enqueue(self, data):
        new_node = Node(data)
        
        if self.is_empty():
            self.front = new_node
            self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
            
        self.size += 1
        
    # Dequeue: O(1)
    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue is empty")
            
        data = self.front.data
        self.front = self.front.next
        
        if self.front is None:
            self.rear = None
            
        self.size -= 1
        return data
        
    # Peek: O(1)
    def peek(self):
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.front.data
        
    # Size: O(1)
    def get_size(self):
        return self.size

# Example usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

print(queue.peek())    # Output: 10
print(queue.dequeue()) # Output: 10
print(queue.get_size()) # Output: 2
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Task scheduling in operating systems</li>
                      <li>Print queue management</li>
                      <li>Handling of requests on a shared resource (CPU scheduling)</li>
                      <li>Breadth-First Search algorithm implementation</li>
                      <li>Buffering for data streams</li>
                      <li>Handling asynchronous data transfers</li>
                      <li>Managing callbacks in event-driven programming</li>
                      <li>Message queues in distributed systems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Queues</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need to process items in order of arrival (FIFO)</li>
                      <li>When implementing level-order processing</li>
                      <li>When managing resources that must be shared among multiple consumers</li>
                      <li>When implementing breadth-first algorithms</li>
                      <li>When buffering or caching data streams</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Queues</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need random access to elements</li>
                      <li>When you need to process elements in LIFO order</li>
                      <li>When you need to process elements based on priority (use Priority Queue instead)</li>
                      <li>When searching operations are frequent</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      
        {/* Hash Tables Content */}
        <TabsContent value="hash-tables" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Hash Tables</CardTitle>
              <CardDescription>
                A data structure that maps keys to values using a hash function
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    A hash table (or hash map) is a data structure that maps keys to values. It uses a hash function to compute an index into an array where the value is stored. This allows for efficient lookups, insertions, and deletions in average constant time.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Characteristics</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Provides key-value mappings with rapid access</li>
                      <li>Uses a hash function to transform keys into array indices</li>
                      <li>Handles collisions (when different keys produce the same hash)</li>
                      <li>Common collision resolution methods include chaining and open addressing</li>
                      <li>Average case O(1) for lookups, insertions, and deletions</li>
                      <li>Provides unordered access (elements are not stored in any specific order)</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Hash Table with Chaining"
                    diagram={`
 Hash Function                   Hash Table (Array)               Values
 ┌───────────┐                 ┌───────────────────┐
 │   h(k)    │                 │        [0]        │─────▶ null
 └───────────┘                 ├───────────────────┤
       │                       │        [1]        │─────▶ null
       │                       ├───────────────────┤
       │                       │        [2]        │──┐
       │                       ├───────────────────┤  │    ┌───────┐     ┌───────┐
       │                       │        [3]        │  └───▶│"apple"│────▶│"grape"│─▶ null
       ▼                       ├───────────────────┤       └───────┘     └───────┘
┌─────────────┐                │        [4]        │─────▶ null
│ "apple" → 2 │                ├───────────────────┤
└─────────────┘                │        [5]        │──┐
┌─────────────┐                ├───────────────────┤  │    ┌───────┐
│ "banana" → 5│                │        [6]        │  └───▶│"banana│─▶ null
└─────────────┘                ├───────────────────┤       └───────┘
┌─────────────┐                │        [7]        │─────▶ null
│ "grape" → 2 │                └───────────────────┘
└─────────────┘
`}
                  />

                  <DiagramBox 
                    title="Hash Table with Open Addressing (Linear Probing)"
                    diagram={`
 Hash Function              Hash Table (Array)
 ┌───────────┐           ┌─────────────────────────────┐
 │   h(k)    │           │     Index     │    Value    │
 └───────────┘           ├─────────────────────────────┤
       │                 │       0       │    null     │
       │                 ├─────────────────────────────┤
       │                 │       1       │    null     │
       │                 ├─────────────────────────────┤
       │                 │       2       │   "apple"   │ ← h("apple") = 2
       ▼                 ├─────────────────────────────┤
┌─────────────┐          │       3       │   "grape"   │ ← h("grape") = 2, collision!
│ "apple" → 2 │          ├─────────────────────────────┤
└─────────────┘          │       4       │    null     │
┌─────────────┐          ├─────────────────────────────┤
│ "banana" → 5│          │       5       │   "banana"  │ ← h("banana") = 5
└─────────────┘          ├─────────────────────────────┤
┌─────────────┐          │       6       │    null     │
│ "grape" → 2 │          ├─────────────────────────────┤
└─────────────┘          │       7       │    null     │
                         └─────────────────────────────┘
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Average Case</th>
                            <th className="px-4 py-2">Worst Case</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Insert</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(n)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Delete</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Search/Lookup</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Get all keys/values</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(n)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Note: Worst-case scenarios occur when there are many collisions, which can happen with a poor hash function or when the table is very full.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Python Built-in Dictionary</h3>
                    <CodeBlock 
                      language="python"
                      code={`# Python dictionaries are built-in hash tables
phonebook = {
    "Alice": "555-1234",
    "Bob": "555-5678",
    "Charlie": "555-9012"
}

# Insert: O(1) average
phonebook["David"] = "555-3456"

# Access: O(1) average
print(phonebook["Alice"])  # Output: 555-1234

# Check if key exists: O(1) average
print("Eve" in phonebook)  # Output: False

# Delete: O(1) average
del phonebook["Alice"]

# Get with default value if key doesn't exist
print(phonebook.get("Eve", "Not found"))  # Output: Not found

# Iterate over key-value pairs: O(n)
for name, number in phonebook.items():
    print(f"{name}: {number}")

# Get all keys or values: O(n)
names = list(phonebook.keys())
numbers = list(phonebook.values())
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Custom Hash Table with Chaining Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.buckets = [[] for _ in range(size)]
        
    def _hash(self, key):
        # Simple hash function using built-in hash and modulo
        return hash(key) % self.size
        
    # Insert: O(1) average
    def insert(self, key, value):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[index]):
            if k == key:
                # Update if key already exists
                self.buckets[index][i] = (key, value)
                return
        # Add new key-value pair
        self.buckets[index].append((key, value))
        
    # Get: O(1) average
    def get(self, key, default=None):
        index = self._hash(key)
        for k, v in self.buckets[index]:
            if k == key:
                return v
        return default
        
    # Delete: O(1) average
    def delete(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[index]):
            if k == key:
                del self.buckets[index][i]
                return True
        return False
        
    # Check if key exists: O(1) average
    def contains(self, key):
        index = self._hash(key)
        for k, v in self.buckets[index]:
            if k == key:
                return True
        return False
        
    # Get all keys: O(n)
    def keys(self):
        keys = []
        for bucket in self.buckets:
            for k, v in bucket:
                keys.append(k)
        return keys
        
    # Get all values: O(n)
    def values(self):
        values = []
        for bucket in self.buckets:
            for k, v in bucket:
                values.append(v)
        return values

# Example usage
ht = HashTable()
ht.insert("Alice", "555-1234")
ht.insert("Bob", "555-5678")
ht.insert("Charlie", "555-9012")

print(ht.get("Alice"))     # Output: 555-1234
print(ht.contains("Bob"))  # Output: True
ht.delete("Alice")
print(ht.get("Alice"))     # Output: None
print(ht.keys())           # Output: ['Bob', 'Charlie']
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Database indexing</li>
                      <li>Caching (e.g., web cache, memoization)</li>
                      <li>Symbol tables in compilers and interpreters</li>
                      <li>Counting frequencies (e.g., word frequency in a document)</li>
                      <li>Implementing sets and maps/dictionaries</li>
                      <li>De-duplication of data</li>
                      <li>Implementing associative arrays</li>
                      <li>Spell checkers and dictionaries</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Hash Tables</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need fast lookups, insertions, and deletions</li>
                      <li>When data has unique identifiers (keys)</li>
                      <li>When you need a one-to-one mapping between keys and values</li>
                      <li>When order of elements is not important</li>
                      <li>When implementing an in-memory cache</li>
                      <li>When working with large datasets where search efficiency is critical</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Hash Tables</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need to maintain element ordering</li>
                      <li>When you need to sort data frequently</li>
                      <li>When memory overhead is a significant concern</li>
                      <li>When you can't create a good hash function for your keys</li>
                      <li>When you need to find the minimum or maximum elements quickly</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      
        {/* Trees Content */}
        <TabsContent value="trees" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trees</CardTitle>
              <CardDescription>
                A hierarchical data structure with nodes connected by edges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    Trees are hierarchical data structures consisting of nodes connected by edges. Each tree has a root node, and every node (except the root) has exactly one parent node and zero or more child nodes.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Terminology</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Root:</strong> The topmost node without a parent</li>
                      <li><strong>Node:</strong> An element of the tree containing data and references to children</li>
                      <li><strong>Edge:</strong> The link between nodes (parent-child relationship)</li>
                      <li><strong>Leaf:</strong> A node with no children</li>
                      <li><strong>Internal Node:</strong> A node with at least one child</li>
                      <li><strong>Depth:</strong> The distance from the root to a node</li>
                      <li><strong>Height:</strong> The distance from a node to its furthest leaf</li>
                      <li><strong>Subtree:</strong> A tree formed by a node and its descendants</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Types of Trees</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Binary Tree:</strong> Each node has at most two children (left and right)</li>
                      <li><strong>Binary Search Tree (BST):</strong> A binary tree where nodes are ordered: left child &lt; parent &lt; right child</li>
                      <li><strong>AVL Tree:</strong> Self-balancing BST where height difference is at most 1</li>
                      <li><strong>B-Tree:</strong> Self-balancing tree with more than two children per node</li>
                      <li><strong>Red-Black Tree:</strong> Self-balancing BST with color properties for balance</li>
                      <li><strong>Trie (Prefix Tree):</strong> Tree for storing strings with shared prefixes</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Binary Tree"
                    diagram={`
                       ┌─────┐
                       │  A  │  ← Root
                       └──┬──┘
             ┌────────────┴────────────┐
         ┌───▼──┐                  ┌───▼──┐
         │  B   │                  │  C   │
         └──┬───┘                  └──┬───┘
       ┌────┴────┐                    │
   ┌───▼──┐  ┌───▼──┐              ┌──▼───┐
   │  D   │  │  E   │              │  F   │  ← Leaf Nodes
   └──────┘  └──────┘              └──────┘
`}
                  />

                  <DiagramBox 
                    title="Binary Search Tree (BST)"
                    diagram={`
                       ┌─────┐
                       │  8  │  ← Root
                       └──┬──┘
             ┌────────────┴────────────┐
         ┌───▼──┐                  ┌───▼──┐
         │  3   │                  │  10  │
         └──┬───┘                  └──┬───┘
       ┌────┴────┐                    │
   ┌───▼──┐  ┌───▼──┐              ┌──▼───┐
   │  1   │  │  6   │              │  14  │
   └──────┘  └──┬───┘              └──────┘
           ┌────┴────┐
       ┌───▼──┐  ┌───▼──┐
       │  4   │  │  7   │
       └──────┘  └──────┘

Properties: Left Child < Parent < Right Child
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Binary Search Tree Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Average Case</th>
                            <th className="px-4 py-2">Worst Case</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Access/Search</td>
                            <td className="px-4 py-2">O(log n)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert</td>
                            <td className="px-4 py-2">O(log n)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Delete</td>
                            <td className="px-4 py-2">O(log n)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Note: Worst case O(n) occurs when the tree is skewed (essentially a linked list).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Tree Traversal Methods</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Method</th>
                            <th className="px-4 py-2">Order</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Pre-order</td>
                            <td className="px-4 py-2">Root → Left → Right</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(h)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">In-order</td>
                            <td className="px-4 py-2">Left → Root → Right</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(h)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Post-order</td>
                            <td className="px-4 py-2">Left → Right → Root</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(h)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Level-order</td>
                            <td className="px-4 py-2">Level by level, left to right</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(w)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      h = height of tree, w = maximum width of tree
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Binary Tree Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
        
    def insert(self, value):
        if not self.root:
            self.root = TreeNode(value)
            return
            
        queue = [self.root]
        while queue:
            node = queue.pop(0)
            
            # Insert to left if empty
            if not node.left:
                node.left = TreeNode(value)
                return
            else:
                queue.append(node.left)
                
            # Insert to right if empty
            if not node.right:
                node.right = TreeNode(value)
                return
            else:
                queue.append(node.right)
    
    # Pre-order traversal: Root -> Left -> Right
    def pre_order(self, node, result=None):
        if result is None:
            result = []
        
        if node:
            result.append(node.value)
            self.pre_order(node.left, result)
            self.pre_order(node.right, result)
            
        return result
    
    # In-order traversal: Left -> Root -> Right
    def in_order(self, node, result=None):
        if result is None:
            result = []
        
        if node:
            self.in_order(node.left, result)
            result.append(node.value)
            self.in_order(node.right, result)
            
        return result
    
    # Post-order traversal: Left -> Right -> Root
    def post_order(self, node, result=None):
        if result is None:
            result = []
        
        if node:
            self.post_order(node.left, result)
            self.post_order(node.right, result)
            result.append(node.value)
            
        return result
    
    # Level-order traversal (breadth-first)
    def level_order(self):
        if not self.root:
            return []
            
        result = []
        queue = [self.root]
        
        while queue:
            node = queue.pop(0)
            result.append(node.value)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
                
        return result

# Example usage
tree = BinaryTree()
for value in [1, 2, 3, 4, 5, 6, 7]:
    tree.insert(value)

print("Pre-order:", tree.pre_order(tree.root))  # [1, 2, 4, 5, 3, 6, 7]
print("In-order:", tree.in_order(tree.root))    # [4, 2, 5, 1, 6, 3, 7]
print("Post-order:", tree.post_order(tree.root)) # [4, 5, 2, 6, 7, 3, 1]
print("Level-order:", tree.level_order())       # [1, 2, 3, 4, 5, 6, 7]
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Binary Search Tree (BST) Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    # Insert a value maintaining BST property
    def insert(self, value):
        if not self.root:
            self.root = TreeNode(value)
            return
            
        self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        # Go left if value is smaller
        if value < node.value:
            if not node.left:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        # Go right if value is greater or equal
        else:
            if not node.right:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    # Search for a value
    def search(self, value):
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        # Not found
        if not node:
            return False
            
        # Found
        if node.value == value:
            return True
            
        # Go left if value is smaller
        if value < node.value:
            return self._search_recursive(node.left, value)
        # Go right if value is greater
        else:
            return self._search_recursive(node.right, value)
    
    # Find minimum value
    def find_min(self):
        if not self.root:
            return None
            
        current = self.root
        while current.left:
            current = current.left
            
        return current.value
    
    # Find maximum value
    def find_max(self):
        if not self.root:
            return None
            
        current = self.root
        while current.right:
            current = current.right
            
        return current.value
    
    # Delete a value
    def delete(self, value):
        self.root = self._delete_recursive(self.root, value)
    
    def _delete_recursive(self, root, value):
        # Base case: empty tree
        if not root:
            return None
            
        # Find the node to delete
        if value < root.value:
            root.left = self._delete_recursive(root.left, value)
        elif value > root.value:
            root.right = self._delete_recursive(root.right, value)
        else:
            # Case 1: Node with no children (leaf)
            if not root.left and not root.right:
                return None
                
            # Case 2: Node with one child
            if not root.left:
                return root.right
            if not root.right:
                return root.left
                
            # Case 3: Node with two children
            # Find inorder successor (smallest in right subtree)
            temp = self._find_min_node(root.right)
            root.value = temp.value
            # Delete the inorder successor
            root.right = self._delete_recursive(root.right, temp.value)
            
        return root
    
    def _find_min_node(self, node):
        current = node
        while current.left:
            current = current.left
        return current
    
    # In-order traversal (sorted for BST)
    def in_order(self):
        result = []
        self._in_order_recursive(self.root, result)
        return result
    
    def _in_order_recursive(self, node, result):
        if node:
            self._in_order_recursive(node.left, result)
            result.append(node.value)
            self._in_order_recursive(node.right, result)

# Example usage
bst = BinarySearchTree()
for value in [5, 3, 7, 2, 4, 6, 8]:
    bst.insert(value)

print("In-order traversal:", bst.in_order())  # [2, 3, 4, 5, 6, 7, 8]
print("Search for 4:", bst.search(4))         # True
print("Search for 9:", bst.search(9))         # False
print("Min value:", bst.find_min())           # 2
print("Max value:", bst.find_max())           # 8

bst.delete(3)
print("After deleting 3:", bst.in_order())    # [2, 4, 5, 6, 7, 8]
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>File systems (directories and files hierarchy)</li>
                      <li>Organization hierarchies and management structures</li>
                      <li>DOM (Document Object Model) in web browsers</li>
                      <li>Decision trees in machine learning</li>
                      <li>Game trees (like chess move analysis)</li>
                      <li>Syntax trees in compilers</li>
                      <li>Database indexes (B-trees and variants)</li>
                      <li>Network routing algorithms</li>
                      <li>Expression parsers and evaluators</li>
                      <li>Huffman coding for data compression</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Trees</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When data has a natural hierarchical structure</li>
                      <li>When you need fast searches, insertions, and deletions</li>
                      <li>When you need to represent sorted data with frequent modifications</li>
                      <li>When you need to efficiently find predecessor or successor elements</li>
                      <li>When implementing priority queues</li>
                      <li>When you need to implement a dictionary with prefix-based searching (tries)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Different Tree Types for Different Needs</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Binary Search Tree:</strong> Sorted data with frequent insertions/deletions</li>
                      <li><strong>AVL Tree/Red-Black Tree:</strong> When tree balance is critical</li>
                      <li><strong>B-Tree:</strong> Database and filesystem indexing</li>
                      <li><strong>Trie:</strong> Dictionary implementations and autocomplete features</li>
                      <li><strong>Heap:</strong> Priority queue implementations</li>
                      <li><strong>Segment Tree:</strong> Range queries and updates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Trees</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When memory is extremely constrained (due to pointer overhead)</li>
                      <li>When the data is simple and linear</li>
                      <li>When you need constant-time access to elements by position</li>
                      <li>When you don't need the hierarchical structure they provide</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      
        {/* Graphs Content */}
        <TabsContent value="graphs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Graphs</CardTitle>
              <CardDescription>
                A non-linear data structure consisting of vertices connected by edges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    A graph is a non-linear data structure consisting of a finite set of vertices (or nodes) and a set of edges connecting these vertices. Graphs are used to represent relationships between pairs of objects.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Terminology</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Vertex/Node:</strong> A fundamental unit of a graph that represents an entity</li>
                      <li><strong>Edge:</strong> A connection between two vertices representing a relationship</li>
                      <li><strong>Adjacency:</strong> Two vertices are adjacent if there is an edge connecting them</li>
                      <li><strong>Path:</strong> A sequence of vertices where each adjacent pair is connected by an edge</li>
                      <li><strong>Cycle:</strong> A path that starts and ends at the same vertex</li>
                      <li><strong>Degree:</strong> The number of edges connected to a vertex</li>
                      <li><strong>Weight:</strong> A value associated with an edge (in weighted graphs)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Types of Graphs</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Undirected Graph:</strong> Edges have no direction (bidirectional)</li>
                      <li><strong>Directed Graph (Digraph):</strong> Edges have direction</li>
                      <li><strong>Weighted Graph:</strong> Edges have associated weights/costs</li>
                      <li><strong>Unweighted Graph:</strong> Edges have no weights</li>
                      <li><strong>Connected Graph:</strong> There is a path between every pair of vertices</li>
                      <li><strong>Disconnected Graph:</strong> At least one vertex cannot be reached from another</li>
                      <li><strong>Cyclic Graph:</strong> Contains at least one cycle</li>
                      <li><strong>Acyclic Graph:</strong> Contains no cycles</li>
                      <li><strong>Complete Graph:</strong> Every vertex is connected to every other vertex</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Undirected Graph"
                    diagram={`
           ┌───┐                  ┌───┐
           │ A │                  │ B │
           └─┬─┘                  └─┬─┘
             │                      │
             │                      │
             │       ┌───┐         │
             └───────┤ C ├─────────┘
                     └─┬─┘
                       │
                       │
                     ┌─┴─┐
                     │ D │
                     └───┘
`}
                  />

                  <DiagramBox 
                    title="Directed Weighted Graph"
                    diagram={`
              ┌───┐         5          ┌───┐
              │ A │─────────────────┬─▶│ B │
              └─┬─┘                 │  └─┬─┘
                │                   │    │
                │                   │    │
                │ 2                 │    │ 3
                ▼                   │    ▼
              ┌───┐        1        │  ┌───┐
              │ C │◀────────────────┘  │ D │
              └─┬─┘                    └───┘
                │
                │
                │ 7
                ▼
              ┌───┐
              │ E │
              └───┘
Edges show direction and weights
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Graph Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Adjacency Matrix</th>
                            <th className="px-4 py-2">Adjacency List</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Add Vertex</td>
                            <td className="px-4 py-2">O(V²)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Remove Vertex</td>
                            <td className="px-4 py-2">O(V²)</td>
                            <td className="px-4 py-2">O(V+E)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Add Edge</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Remove Edge</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(E)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Check if edge exists</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(V)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Find all neighbors of a vertex</td>
                            <td className="px-4 py-2">O(V)</td>
                            <td className="px-4 py-2">O(degree)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Space Complexity</td>
                            <td className="px-4 py-2">O(V²)</td>
                            <td className="px-4 py-2">O(V+E)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      V = number of vertices, E = number of edges
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Graph Traversal Algorithms</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Algorithm</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Breadth-First Search (BFS)</td>
                            <td className="px-4 py-2">Explores all neighbors before moving to next level</td>
                            <td className="px-4 py-2">O(V+E)</td>
                            <td className="px-4 py-2">O(V)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Depth-First Search (DFS)</td>
                            <td className="px-4 py-2">Explores as far as possible along each branch</td>
                            <td className="px-4 py-2">O(V+E)</td>
                            <td className="px-4 py-2">O(V)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Dijkstra's Algorithm</td>
                            <td className="px-4 py-2">Finds shortest paths from source to all vertices</td>
                            <td className="px-4 py-2">O(V² + E) or O(E + V log V) with heap</td>
                            <td className="px-4 py-2">O(V)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Bellman-Ford</td>
                            <td className="px-4 py-2">Shortest paths with negative weights</td>
                            <td className="px-4 py-2">O(V × E)</td>
                            <td className="px-4 py-2">O(V)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Kruskal's Algorithm</td>
                            <td className="px-4 py-2">Finds minimum spanning tree</td>
                            <td className="px-4 py-2">O(E log E)</td>
                            <td className="px-4 py-2">O(V + E)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Adjacency Matrix Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class GraphMatrix:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.matrix = [[0 for _ in range(num_vertices)] for _ in range(num_vertices)]
        
    def add_edge(self, v1, v2, weight=1):
        if 0 <= v1 < self.num_vertices and 0 <= v2 < self.num_vertices:
            self.matrix[v1][v2] = weight
            # For undirected graph, uncomment the line below
            # self.matrix[v2][v1] = weight
    
    def remove_edge(self, v1, v2):
        if 0 <= v1 < self.num_vertices and 0 <= v2 < self.num_vertices:
            self.matrix[v1][v2] = 0
            # For undirected graph, uncomment the line below
            # self.matrix[v2][v1] = 0
    
    def has_edge(self, v1, v2):
        if 0 <= v1 < self.num_vertices and 0 <= v2 < self.num_vertices:
            return self.matrix[v1][v2] != 0
        return False
    
    def get_neighbors(self, vertex):
        if 0 <= vertex < self.num_vertices:
            neighbors = []
            for i in range(self.num_vertices):
                if self.matrix[vertex][i] != 0:
                    neighbors.append((i, self.matrix[vertex][i]))
            return neighbors
        return []
    
    def print_graph(self):
        for row in self.matrix:
            print(row)

# Example usage
graph = GraphMatrix(4)  # Create a graph with 4 vertices (0, 1, 2, 3)

# Add edges: (0,1), (0,2), (1,2), (2,3)
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 2)
graph.add_edge(2, 3)

print("Adjacency Matrix:")
graph.print_graph()
# Output:
# [0, 1, 1, 0]
# [0, 0, 1, 0]
# [0, 0, 0, 1]
# [0, 0, 0, 0]

print("Neighbors of vertex 2:", graph.get_neighbors(2))  # [(3, 1)]
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Adjacency List Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class GraphList:
    def __init__(self):
        self.adjacency_list = {}
        
    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []
    
    def add_edge(self, v1, v2, weight=1):
        # Add vertices if they don't exist
        if v1 not in self.adjacency_list:
            self.add_vertex(v1)
        if v2 not in self.adjacency_list:
            self.add_vertex(v2)
            
        # Add the edge
        self.adjacency_list[v1].append((v2, weight))
        
        # For undirected graph, uncomment the line below
        # self.adjacency_list[v2].append((v1, weight))
    
    def remove_edge(self, v1, v2):
        if v1 in self.adjacency_list and v2 in self.adjacency_list:
            self.adjacency_list[v1] = [(v, w) for v, w in self.adjacency_list[v1] if v != v2]
            # For undirected graph, uncomment the line below
            # self.adjacency_list[v2] = [(v, w) for v, w in self.adjacency_list[v2] if v != v1]
    
    def remove_vertex(self, vertex):
        if vertex in self.adjacency_list:
            # Remove the vertex
            del self.adjacency_list[vertex]
            
            # Remove all edges pointing to this vertex
            for v in self.adjacency_list:
                self.adjacency_list[v] = [(dest, w) for dest, w in self.adjacency_list[v] if dest != vertex]
    
    def has_edge(self, v1, v2):
        if v1 in self.adjacency_list:
            return any(v == v2 for v, w in self.adjacency_list[v1])
        return False
    
    def get_neighbors(self, vertex):
        if vertex in self.adjacency_list:
            return self.adjacency_list[vertex]
        return []
    
    def print_graph(self):
        for vertex, neighbors in self.adjacency_list.items():
            print(f"{vertex} -> {neighbors}")

# Example usage
graph = GraphList()

# Add vertices
graph.add_vertex("A")
graph.add_vertex("B")
graph.add_vertex("C")
graph.add_vertex("D")

# Add edges
graph.add_edge("A", "B", 5)
graph.add_edge("A", "C", 2)
graph.add_edge("B", "D", 3)
graph.add_edge("C", "B", 1)
graph.add_edge("C", "E", 7)

print("Adjacency List:")
graph.print_graph()
# Output:
# A -> [(B, 5), (C, 2)]
# B -> [(D, 3)]
# C -> [(B, 1), (E, 7)]
# D -> []
# E is added automatically when the edge (C, E) is created

print("Neighbors of vertex C:", graph.get_neighbors("C"))  # [(B, 1), (E, 7)]
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Graph Traversal Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`from collections import deque

class Graph:
    def __init__(self):
        self.adjacency_list = {}
        
    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []
            
    def add_edge(self, v1, v2):
        self.adjacency_list[v1].append(v2)
        self.adjacency_list[v2].append(v1)  # For undirected graph
    
    # Breadth-First Search
    def bfs(self, start_vertex):
        if start_vertex not in self.adjacency_list:
            return []
            
        visited = set()
        result = []
        queue = deque([start_vertex])
        visited.add(start_vertex)
        
        while queue:
            current_vertex = queue.popleft()
            result.append(current_vertex)
            
            for neighbor in self.adjacency_list[current_vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    
        return result
    
    # Depth-First Search (recursive)
    def dfs_recursive(self, start_vertex):
        if start_vertex not in self.adjacency_list:
            return []
            
        result = []
        visited = set()
        
        def dfs_helper(vertex):
            visited.add(vertex)
            result.append(vertex)
            
            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    dfs_helper(neighbor)
        
        dfs_helper(start_vertex)
        return result
    
    # Depth-First Search (iterative)
    def dfs_iterative(self, start_vertex):
        if start_vertex not in self.adjacency_list:
            return []
            
        result = []
        visited = set()
        stack = [start_vertex]
        
        while stack:
            current_vertex = stack.pop()
            
            if current_vertex not in visited:
                visited.add(current_vertex)
                result.append(current_vertex)
                
                # Add all neighbors to the stack (in reverse order to simulate recursion)
                for neighbor in reversed(self.adjacency_list[current_vertex]):
                    if neighbor not in visited:
                        stack.append(neighbor)
                        
        return result

# Example usage
graph = Graph()
for vertex in ["A", "B", "C", "D", "E", "F"]:
    graph.add_vertex(vertex)
    
graph.add_edge("A", "B")
graph.add_edge("A", "C")
graph.add_edge("B", "D")
graph.add_edge("C", "E")
graph.add_edge("D", "E")
graph.add_edge("D", "F")
graph.add_edge("E", "F")

print("BFS starting from A:", graph.bfs("A"))  
# Output: ['A', 'B', 'C', 'D', 'E', 'F']

print("DFS (recursive) starting from A:", graph.dfs_recursive("A"))  
# Output: ['A', 'B', 'D', 'E', 'C', 'F']

print("DFS (iterative) starting from A:", graph.dfs_iterative("A"))  
# Output: ['A', 'C', 'E', 'F', 'D', 'B']
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Social networks (users as vertices, connections as edges)</li>
                      <li>Web page networks (pages as vertices, hyperlinks as edges)</li>
                      <li>Road networks (intersections as vertices, roads as edges)</li>
                      <li>Computer networks (devices as vertices, connections as edges)</li>
                      <li>Map and GPS applications (location routing)</li>
                      <li>Recommendation systems</li>
                      <li>Dependency resolution in package managers</li>
                      <li>Flight networks (airports as vertices, flights as edges)</li>
                      <li>Game development (movement and pathfinding)</li>
                      <li>Molecule and chemical compound modeling</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Common Graph Algorithms by Use Case</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Shortest Path:</strong> Dijkstra's, Bellman-Ford, A* search</li>
                      <li><strong>Connectivity:</strong> BFS, DFS, Union-Find</li>
                      <li><strong>Minimum Spanning Tree:</strong> Kruskal's, Prim's algorithms</li>
                      <li><strong>Cycle Detection:</strong> DFS with graph coloring</li>
                      <li><strong>Topological Sorting:</strong> For directed acyclic graphs</li>
                      <li><strong>Network Flow:</strong> Ford-Fulkerson, Edmonds-Karp algorithms</li>
                      <li><strong>Strongly Connected Components:</strong> Kosaraju's, Tarjan's algorithms</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Graphs</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When data has interconnected relationships</li>
                      <li>When you need to find the shortest path between entities</li>
                      <li>When analyzing network structures</li>
                      <li>When solving problems involving connectivity</li>
                      <li>When dealing with dependencies and prerequisites</li>
                      <li>When optimizing resource allocation across a network</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Choose Between Representations</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Adjacency Matrix:</strong> When the graph is dense or nearly complete</li>
                      <li><strong>Adjacency List:</strong> When the graph is sparse (few edges compared to vertices)</li>
                      <li><strong>Edge List:</strong> When you only need to iterate over edges</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Graphs</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When data has a simple linear or hierarchical structure</li>
                      <li>When memory is highly constrained (graphs can require significant memory)</li>
                      <li>When the problem doesn't involve relationships between entities</li>
                      <li>When using a simpler data structure (like array or tree) would suffice</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      
        {/* Heaps Content */}
        <TabsContent value="heaps" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Heaps</CardTitle>
              <CardDescription>
                A specialized tree-based data structure that satisfies the heap property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p>
                    A heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, for any given node, the node's value is greater than or equal to the values of its children. In a min heap, the node's value is less than or equal to the values of its children.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Characteristics</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Complete binary tree (all levels filled except possibly the last)</li>
                      <li>Satisfies the heap property (min heap or max heap)</li>
                      <li>Efficiently implemented using an array</li>
                      <li>Root node contains the minimum value (min heap) or maximum value (max heap)</li>
                      <li>Provides O(1) access to the min/max element</li>
                      <li>Efficient insertions and deletions (O(log n))</li>
                      <li>Used in priority queue implementations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Types of Heaps</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Min Heap:</strong> Parent nodes have smaller values than their children</li>
                      <li><strong>Max Heap:</strong> Parent nodes have larger values than their children</li>
                      <li><strong>Binary Heap:</strong> Each node has at most two children (most common)</li>
                      <li><strong>Fibonacci Heap:</strong> More efficient for certain operations</li>
                      <li><strong>Binomial Heap:</strong> Collection of binomial trees</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Max Heap"
                    diagram={`
                      ┌─────┐
                      │ 100 │ ← Root (maximum value)
                      └──┬──┘
            ┌────────────┴────────────┐
        ┌───▼──┐                  ┌───▼──┐
        │  19  │                  │  36  │
        └──┬───┘                  └──┬───┘
      ┌────┴────┐               ┌────┴────┐
  ┌───▼──┐  ┌───▼──┐        ┌───▼──┐  ┌───▼──┐
  │  17  │  │  3   │        │  25  │  │  1   │
  └──────┘  └──────┘        └──────┘  └──────┘

Heap Property: Parent >= Children
`}
                  />

                  <DiagramBox 
                    title="Min Heap"
                    diagram={`
                      ┌────┐
                      │ 1  │ ← Root (minimum value)
                      └─┬──┘
            ┌───────────┴───────────┐
        ┌───▼──┐                ┌───▼──┐
        │  5   │                │  2   │
        └──┬───┘                └──┬───┘
      ┌────┴────┐             ┌────┴────┐
  ┌───▼──┐  ┌───▼──┐      ┌───▼──┐  ┌───▼──┐
  │  8   │  │  6   │      │  9   │  │  3   │
  └──────┘  └──────┘      └──────┘  └──────┘

Heap Property: Parent <= Children
`}
                  />

                  <DiagramBox 
                    title="Array Representation of Heap"
                    diagram={`
For the Max Heap above:

Index:  0   1   2   3   4   5   6 
Array: [100, 19, 36, 17, 3, 25, 1]

Parent(i) = floor((i-1)/2)
Left Child(i) = 2i + 1
Right Child(i) = 2i + 2
`}
                  />
                </TabsContent>
                
                <TabsContent value="operations" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Operations and Time Complexities</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-muted-foreground/20">
                        <thead>
                          <tr className="text-left">
                            <th className="px-4 py-2">Operation</th>
                            <th className="px-4 py-2">Time Complexity</th>
                            <th className="px-4 py-2">Space Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted-foreground/20">
                          <tr>
                            <td className="px-4 py-2">Get minimum/maximum (peek)</td>
                            <td className="px-4 py-2">O(1)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Insert element</td>
                            <td className="px-4 py-2">O(log n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Remove minimum/maximum (extract)</td>
                            <td className="px-4 py-2">O(log n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Heapify (build heap from array)</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Delete arbitrary element</td>
                            <td className="px-4 py-2">O(log n) + time to find element</td>
                            <td className="px-4 py-2">O(1)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">Merge two heaps</td>
                            <td className="px-4 py-2">O(n)</td>
                            <td className="px-4 py-2">O(n)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      n = number of elements in the heap
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Min Heap Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class MinHeap:
    def __init__(self):
        self.heap = []
        self.size = 0
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def get_min(self):
        if self.size <= 0:
            return None
        return self.heap[0]
    
    def is_leaf(self, i):
        # If i is a leaf node
        return i >= self.size // 2 and i < self.size
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def heapify_down(self, i):
        # If not a leaf and larger than a child
        if not self.is_leaf(i):
            # Find the smallest child
            min_child_idx = self.left_child(i)
            right_idx = self.right_child(i)
            
            if right_idx < self.size and self.heap[right_idx] < self.heap[min_child_idx]:
                min_child_idx = right_idx
            
            # If parent is greater than the smallest child, swap and heapify down
            if self.heap[i] > self.heap[min_child_idx]:
                self.swap(i, min_child_idx)
                self.heapify_down(min_child_idx)
    
    def heapify_up(self, i):
        # While not root and parent is greater than current
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def insert(self, key):
        self.heap.append(key)
        self.size += 1
        self.heapify_up(self.size - 1)
    
    def extract_min(self):
        if self.size <= 0:
            return None
        
        min_val = self.heap[0]
        
        # Replace root with last element
        self.heap[0] = self.heap[self.size - 1]
        self.size -= 1
        self.heap.pop()
        
        # Restore heap property
        self.heapify_down(0)
        
        return min_val
    
    def build_heap(self, arr):
        self.heap = arr.copy()
        self.size = len(arr)
        
        # Start from the last non-leaf node and heapify down
        for i in range(self.size // 2 - 1, -1, -1):
            self.heapify_down(i)

# Example usage
min_heap = MinHeap()
min_heap.insert(5)
min_heap.insert(3)
min_heap.insert(8)
min_heap.insert(1)
min_heap.insert(10)

print("Min heap:", min_heap.heap)  # [1, 3, 8, 5, 10]
print("Minimum value:", min_heap.get_min())  # 1

print("Extracted min:", min_heap.extract_min())  # 1
print("Min heap after extraction:", min_heap.heap)  # [3, 5, 8, 10]

# Building heap from array
arr = [10, 5, 8, 3, 1]
heap = MinHeap()
heap.build_heap(arr)
print("Built min heap:", heap.heap)  # [1, 3, 8, 5, 10]
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Max Heap Implementation</h3>
                    <CodeBlock 
                      language="python"
                      code={`class MaxHeap:
    def __init__(self):
        self.heap = []
        self.size = 0
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def get_max(self):
        if self.size <= 0:
            return None
        return self.heap[0]
    
    def is_leaf(self, i):
        return i >= self.size // 2 and i < self.size
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def heapify_down(self, i):
        if not self.is_leaf(i):
            max_child_idx = self.left_child(i)
            right_idx = self.right_child(i)
            
            if right_idx < self.size and self.heap[right_idx] > self.heap[max_child_idx]:
                max_child_idx = right_idx
            
            # If parent is smaller than the largest child, swap and heapify down
            if self.heap[i] < self.heap[max_child_idx]:
                self.swap(i, max_child_idx)
                self.heapify_down(max_child_idx)
    
    def heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def insert(self, key):
        self.heap.append(key)
        self.size += 1
        self.heapify_up(self.size - 1)
    
    def extract_max(self):
        if self.size <= 0:
            return None
        
        max_val = self.heap[0]
        
        # Replace root with last element
        self.heap[0] = self.heap[self.size - 1]
        self.size -= 1
        self.heap.pop()
        
        # Restore heap property
        self.heapify_down(0)
        
        return max_val
    
    def build_heap(self, arr):
        self.heap = arr.copy()
        self.size = len(arr)
        
        # Start from the last non-leaf node and heapify down
        for i in range(self.size // 2 - 1, -1, -1):
            self.heapify_down(i)

# Example usage
max_heap = MaxHeap()
max_heap.insert(5)
max_heap.insert(3)
max_heap.insert(8)
max_heap.insert(1)
max_heap.insert(10)

print("Max heap:", max_heap.heap)  # [10, 5, 8, 1, 3]
print("Maximum value:", max_heap.get_max())  # 10

print("Extracted max:", max_heap.extract_max())  # 10
print("Max heap after extraction:", max_heap.heap)  # [8, 5, 3, 1]

# Heapsort using max heap
def heap_sort(arr):
    # Build a max heap
    h = MaxHeap()
    h.build_heap(arr)
    
    # Extract all elements in decreasing order
    sorted_arr = []
    for _ in range(h.size):
        sorted_arr.append(h.extract_max())
    
    return sorted_arr[::-1]  # Reverse to get ascending order

print("Heap sort:", heap_sort([5, 3, 8, 1, 10]))  # [1, 3, 5, 8, 10]
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Using Python's Built-in Heap (heapq)</h3>
                    <CodeBlock 
                      language="python"
                      code={`import heapq

# heapq implements min heap in Python
# Create a heap from a list
arr = [5, 3, 8, 1, 10]
heapq.heapify(arr)  # Transform list in-place into a heap
print("Min heap:", arr)  # [1, 3, 8, 5, 10]

# Insert (push) element
heapq.heappush(arr, 2)
print("After push:", arr)  # [1, 3, 2, 5, 10, 8]

# Remove (pop) smallest element
min_val = heapq.heappop(arr)
print("Popped value:", min_val)  # 1
print("After pop:", arr)  # [2, 3, 8, 5, 10]

# Push element and pop smallest in one operation
next_val = heapq.heappushpop(arr, 7)  # Push 7, then pop smallest
print("Push-pop value:", next_val)  # 2
print("After push-pop:", arr)  # [3, 5, 8, 7, 10]

# Pop smallest, then push new element
next_val = heapq.heapreplace(arr, 4)  # Pop smallest, then push 4
print("Replace value:", next_val)  # 3
print("After replace:", arr)  # [4, 5, 8, 7, 10]

# Get n largest elements
largest = heapq.nlargest(2, arr)
print("2 largest:", largest)  # [10, 8]

# Get n smallest elements
smallest = heapq.nsmallest(2, arr)
print("2 smallest:", smallest)  # [4, 5]

# Using a max heap in Python (with negative values)
max_heap = [-x for x in [5, 3, 8, 1, 10]]
heapq.heapify(max_heap)
print("Max heap (negated):", max_heap)  # [-10, -5, -8, -1, -3]

# Pop maximum element
max_val = -heapq.heappop(max_heap)
print("Max value:", max_val)  # 10
`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Common Use Cases</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Priority queue implementation</li>
                      <li>Heap sort algorithm</li>
                      <li>Finding k largest/smallest elements</li>
                      <li>Dijkstra's algorithm for shortest path</li>
                      <li>Prim's algorithm for minimum spanning tree</li>
                      <li>Huffman coding (compression algorithm)</li>
                      <li>Job scheduling based on priority</li>
                      <li>Event-driven simulation</li>
                      <li>Media streaming applications (buffering)</li>
                      <li>Graph algorithms with priority-based traversal</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Priority Queue Implementation with Heap</h3>
                    <CodeBlock 
                      language="python"
                      code={`class PriorityQueue:
    def __init__(self):
        self.heap = []
    
    def is_empty(self):
        return len(self.heap) == 0
    
    # Add element with priority (smaller value = higher priority)
    def enqueue(self, item, priority):
        heapq.heappush(self.heap, (priority, item))
    
    # Remove highest priority element
    def dequeue(self):
        if self.is_empty():
            return None
        priority, item = heapq.heappop(self.heap)
        return item
    
    # Peek at highest priority element without removing
    def peek(self):
        if self.is_empty():
            return None
        return self.heap[0][1]

# Example usage
pq = PriorityQueue()
pq.enqueue("Task A", 3)
pq.enqueue("Task B", 1)  # Highest priority (lowest value)
pq.enqueue("Task C", 2)

print("Next task:", pq.peek())  # Task B
print("Processing:", pq.dequeue())  # Task B
print("Processing:", pq.dequeue())  # Task C
print("Processing:", pq.dequeue())  # Task A
`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Use Heaps</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need constant-time access to the maximum or minimum element</li>
                      <li>When you need to efficiently extract the maximum or minimum element repeatedly</li>
                      <li>When implementing priority-based systems</li>
                      <li>When you need to sort elements efficiently (heap sort)</li>
                      <li>When performing graph algorithms that require prioritized vertex exploration</li>
                      <li>When implementing efficient median-finding algorithms</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Choosing Between Min and Max Heaps</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Min Heap:</strong> When you need to efficiently find and remove the smallest element</li>
                      <li><strong>Max Heap:</strong> When you need to efficiently find and remove the largest element</li>
                      <li><strong>Both:</strong> When finding median in a stream of numbers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">When to Avoid Heaps</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>When you need sorted access to all elements</li>
                      <li>When you need fast search for arbitrary elements</li>
                      <li>When you need efficient support for random access</li>
                      <li>When memory usage is highly constrained (trees have some overhead)</li>
                      <li>When the data structure needs to support many different operations efficiently</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      
      </Tabs>
    </div>
  )
} 