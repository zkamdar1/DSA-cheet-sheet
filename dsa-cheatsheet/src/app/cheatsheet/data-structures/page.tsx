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
      
        {/* Other data structure tabs will go here */}
      
      </Tabs>
    </div>
  )
} 