"use client"

import { DiagramBox } from "@/components/DiagramBox"
import { CodeBlock } from "@/components/CodeBlock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHashNavigation } from "@/lib/use-hash-navigation"

export default function PatternsPage() {
  const { activeTab, setActiveTab } = useHashNavigation("sliding-window")
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Problem-Solving Patterns</h1>
        <p className="text-muted-foreground">
          Common algorithmic patterns to approach and solve technical interview problems efficiently.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center justify-start">
          <TabsTrigger value="sliding-window">Sliding Window</TabsTrigger>
          <TabsTrigger value="two-pointers">Two Pointers</TabsTrigger>
          <TabsTrigger value="fast-slow">Fast & Slow Pointers</TabsTrigger>
          <TabsTrigger value="bfs-dfs">BFS/DFS Patterns</TabsTrigger>
        </TabsList>
        
        {/* Sliding Window Pattern */}
        <TabsContent value="sliding-window" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sliding Window Pattern</CardTitle>
              <CardDescription>
                An efficient technique for processing arrays or strings by creating a window that slides through the data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">What Is It?</h3>
                  <p>
                    The Sliding Window pattern is used to perform operations on a specific window size of arrays or strings.
                    Instead of recomputing everything from scratch for each window, we add/remove elements as the window moves.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">When To Use It</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Problems involving arrays or strings where we need to find subarrays or substrings that satisfy given conditions</li>
                    <li>When we need to compute something over a range of contiguous elements</li>
                    <li>When looking for the maximum/minimum sum of a subarray of size k</li>
                    <li>Finding the longest/shortest substring with certain properties</li>
                  </ul>
                </div>
                
                <DiagramBox 
                  title="Sliding Window Visualization"
                  diagram={`
Array: [2, 1, 5, 1, 3, 2]
Task: Find maximum sum of a subarray of size k=3

Iteration 1: Window [2, 1, 5]
             Sum = 8
             Max = 8
 [2, 1, 5, 1, 3, 2]
  -------
  
Iteration 2: Window [1, 5, 1]
             Sum = 7 (8 - 2 + 1)
             Max = 8
 [2, 1, 5, 1, 3, 2]
     -------
  
Iteration 3: Window [5, 1, 3]
             Sum = 9 (7 - 1 + 3)
             Max = 9
 [2, 1, 5, 1, 3, 2]
        -------
  
Iteration 4: Window [1, 3, 2]
             Sum = 6 (9 - 5 + 2)
             Max = 9
 [2, 1, 5, 1, 3, 2]
           -------
  
Result: Maximum sum is 9
`}
                />
                
                <div>
                  <h3 className="font-medium mb-2">Variations</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold">Fixed Size Window</h4>
                      <p className="text-sm">Used when we need to operate on a fixed-size window that slides through the array or string.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Maximum sum subarray of size k, Find averages of all contiguous subarrays of size k</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Dynamic Size Window</h4>
                      <p className="text-sm">Used when we need to adjust the window size based on certain conditions.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Smallest subarray with a given sum, Longest substring without repeating characters</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: Max Sum Subarray</h3>
                  <CodeBlock 
                    language="python"
                    code={`def max_subarray_sum(arr, k):
    """
    Find the maximum sum of a subarray of size k.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    n = len(arr)
    
    # Return 0 if array is empty or k is invalid
    if n == 0 or k <= 0 or k > n:
        return 0
    
    # Initialize variables
    window_sum = 0
    max_sum = float('-inf')
    
    # Compute sum of first window
    for i in range(k):
        window_sum += arr[i]
    
    # Initialize max sum to the first window sum
    max_sum = window_sum
    
    # Slide the window through the array
    for i in range(k, n):
        # Add the next element and remove the first element of previous window
        window_sum = window_sum - arr[i - k] + arr[i]
        # Update max sum if current window sum is greater
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example usage
arr = [2, 1, 5, 1, 3, 2]
k = 3
result = max_subarray_sum(arr, k)
print(f"Maximum sum of a subarray of size {k}: {result}")  # Output: 9`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: Smallest Subarray with Given Sum</h3>
                  <CodeBlock 
                    language="python"
                    code={`def smallest_subarray_with_given_sum(arr, target_sum):
    """
    Find the length of the smallest contiguous subarray whose sum is
    greater than or equal to target_sum.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    n = len(arr)
    
    # Return 0 if array is empty
    if n == 0:
        return 0
    
    # Initialize variables
    window_sum = 0
    min_length = float('inf')
    window_start = 0
    
    # Slide the window through the array
    for window_end in range(n):
        # Add the next element to the window
        window_sum += arr[window_end]
        
        # Shrink the window as small as possible until the window_sum is smaller than target_sum
        while window_sum >= target_sum:
            # Update the minimum length
            min_length = min(min_length, window_end - window_start + 1)
            # Remove the leftmost element from the window
            window_sum -= arr[window_start]
            window_start += 1
    
    # Return minimum length, or 0 if no valid subarray found
    return min_length if min_length != float('inf') else 0

# Example usage
arr = [2, 1, 5, 2, 3, 2]
target_sum = 7
result = smallest_subarray_with_given_sum(arr, target_sum)
print(f"Smallest subarray length with sum >= {target_sum}: {result}")  # Output: 2`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Common Problems</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Maximum sum subarray of size k</li>
                    <li>Smallest subarray with a sum greater than a given value</li>
                    <li>Longest substring with K distinct characters</li>
                    <li>Longest substring without repeating characters</li>
                    <li>Permutation in a string</li>
                    <li>String anagrams</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Two Pointers Pattern */}
        <TabsContent value="two-pointers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Two Pointers Pattern</CardTitle>
              <CardDescription>
                An efficient technique using two pointers to iterate through arrays or linked lists in tandem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">What Is It?</h3>
                  <p>
                    The Two Pointers pattern uses two pointers to iterate through a data structure in a single pass.
                    These pointers can move toward each other, in the same direction at different speeds, or start from different positions.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">When To Use It</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Searching for pairs in a sorted array</li>
                    <li>Removing duplicates from sorted arrays</li>
                    <li>Finding triplets that sum to a target</li>
                    <li>Checking for palindromes</li>
                    <li>Partitioning arrays (Dutch National Flag problem)</li>
                  </ul>
                </div>
                
                <DiagramBox 
                  title="Two Pointers Visualization: Pair Sum"
                  diagram={`
Sorted Array: [1, 2, 3, 4, 6, 8, 9, 11]
Target Sum: 10

Initialize two pointers:
L points to the start, R points to the end

[1, 2, 3, 4, 6, 8, 9, 11]
 L                     R
 
Step 1: arr[L] + arr[R] = 1 + 11 = 12 > 10
        Move R to the left
[1, 2, 3, 4, 6, 8, 9, 11]
 L                  R
 
Step 2: arr[L] + arr[R] = 1 + 9 = 10 == 10
        Found a pair! Return (1, 9)
[1, 2, 3, 4, 6, 8, 9, 11]
 L               R
`}
                />
                
                <div>
                  <h3 className="font-medium mb-2">Variations</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold">Opposite Direction (Converging)</h4>
                      <p className="text-sm">Two pointers start from opposite ends and move toward each other.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Two Sum II, Container With Most Water, Valid Palindrome</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Same Direction (Fast & Slow)</h4>
                      <p className="text-sm">Two pointers move in the same direction at different speeds or with different update conditions.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Remove Duplicates, Middle of Linked List, Cycle Detection</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Partition-Based</h4>
                      <p className="text-sm">Pointers are used to partition an array based on certain conditions.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Dutch National Flag Problem, Quick Sort, Sort Colors</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: Pair with Target Sum</h3>
                  <CodeBlock 
                    language="python"
                    code={`def pair_with_target_sum(arr, target_sum):
    """
    Find a pair in a sorted array that adds up to the target sum.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        # Found the pair
        if current_sum == target_sum:
            return [left, right]
            
        # If sum is less than target, move left pointer
        if current_sum < target_sum:
            left += 1
        # If sum is greater than target, move right pointer
        else:
            right -= 1
            
    # No pair found
    return [-1, -1]

# Example usage
arr = [1, 2, 3, 4, 6, 8, 9, 11]
target_sum = 10
result = pair_with_target_sum(arr, target_sum)
print(f"Pair with sum {target_sum}: {arr[result[0]], arr[result[1]]}")  # Output: (1, 9)`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: Remove Duplicates</h3>
                  <CodeBlock 
                    language="python"
                    code={`def remove_duplicates(arr):
    """
    Remove duplicates from a sorted array in-place and
    return the length of the array with unique elements.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    # Edge case: empty array
    if len(arr) == 0:
        return 0
        
    # Initialize the pointer for the next non-duplicate element
    next_non_duplicate = 1
    
    # Iterate through the array starting from the second element
    for i in range(1, len(arr)):
        # If the current element is different from the previous one
        if arr[i] != arr[i - 1]:
            # Place it at the next non-duplicate position
            arr[next_non_duplicate] = arr[i]
            next_non_duplicate += 1
            
    # Return the count of unique elements
    return next_non_duplicate

# Example usage
arr = [1, 1, 2, 3, 3, 3, 4, 5, 5]
length = remove_duplicates(arr)
print(f"Array after removing duplicates: {arr[:length]}")  # Output: [1, 2, 3, 4, 5]`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Common Problems</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Two Sum (in sorted array)</li>
                    <li>Three Sum / Four Sum</li>
                    <li>Remove Duplicates from sorted array</li>
                    <li>Squaring a sorted array</li>
                    <li>Dutch National Flag problem (Sort Colors)</li>
                    <li>Container With Most Water</li>
                    <li>Trapping Rain Water</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Fast & Slow Pointers Pattern */}
        <TabsContent value="fast-slow" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Fast & Slow Pointers Pattern</CardTitle>
              <CardDescription>
                A technique using two pointers moving at different speeds to detect cycles or find middle elements in linear data structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">What Is It?</h3>
                  <p>
                    The Fast & Slow Pointers pattern (also known as Hare & Tortoise algorithm) uses two pointers that move through the array 
                    or linked list at different speeds. The fast pointer moves twice as fast as the slow pointer, which helps detect cycles 
                    or find the middle of a linked list in one pass.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">When To Use It</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Detecting cycles in a linked list or array</li>
                    <li>Finding the middle element of a linked list</li>
                    <li>Finding if a linked list is a palindrome</li>
                    <li>Identifying the start of a cycle in a linked list</li>
                    <li>Problems involving cyclic detection in sequences</li>
                  </ul>
                </div>
                
                <DiagramBox 
                  title="Fast & Slow Pointers Visualization: Cycle Detection"
                  diagram={`
Linked List: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 3 (cycles back)

Initialize two pointers:
Slow moves one step at a time
Fast moves two steps at a time

Start:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 
S    F

Step 1:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 
     S         F

Step 2:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 
          S              F

Step 3:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 
               S    ↑    |
               ↑    |    |
               |    |    |
               ← ← ← ← ← ↓
                    F

Step 4:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 
                    S    |
                    |    |
          F         |    |
          ↑         |    |
          ← ← ← ← ← ← ← ↓

Step 5: Fast and Slow meet at node 3
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 
     F,S
     
Cycle detected!
`}
                />
                
                <div>
                  <h3 className="font-medium mb-2">Variations</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold">Cycle Detection</h4>
                      <p className="text-sm">Used to determine if a linked list or sequence has a cycle or loop.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: LinkedList Cycle, Circular Array Loop</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Middle Element Finding</h4>
                      <p className="text-sm">Used to find the middle element of a linked list in one pass.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Middle of the LinkedList, Palindrome LinkedList</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Cycle Start Finding</h4>
                      <p className="text-sm">Used to find the node where the cycle begins in a linked list.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: LinkedList Cycle II, Find the Duplicate Number</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: Detect Cycle in a Linked List</h3>
                  <CodeBlock 
                    language="python"
                    code={`class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def has_cycle(head):
    """
    Determine if a linked list has a cycle.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    # Edge case: empty list or single node
    if not head or not head.next:
        return False
        
    # Initialize slow and fast pointers
    slow = head
    fast = head
    
    # Move slow by one step and fast by two steps
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        # If slow and fast meet, there's a cycle
        if slow == fast:
            return True
            
    # If fast reaches the end, there's no cycle
    return False

# Example usage
# Create a linked list with a cycle: 1->2->3->4->5->3(cycles back)
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
head.next.next.next.next = ListNode(5)
head.next.next.next.next.next = head.next.next  # Create cycle by pointing to node 3

result = has_cycle(head)
print(f"Linked list has cycle: {result}")  # Output: True`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: Find Middle of a Linked List</h3>
                  <CodeBlock 
                    language="python"
                    code={`class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def find_middle(head):
    """
    Find the middle node of a linked list.
    If the list has even number of nodes, return the second middle node.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    # Edge case: empty list or single node
    if not head or not head.next:
        return head
        
    # Initialize slow and fast pointers
    slow = head
    fast = head
    
    # Move slow by one step and fast by two steps
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
    # When fast reaches the end, slow is at the middle
    return slow

# Example usage
# Create a linked list: 1->2->3->4->5
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
head.next.next.next.next = ListNode(5)

middle = find_middle(head)
print(f"Middle node value: {middle.value}")  # Output: 3`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Common Problems</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Linked List Cycle</li>
                    <li>Linked List Cycle II (find cycle start)</li>
                    <li>Happy Number</li>
                    <li>Middle of the Linked List</li>
                    <li>Palindrome Linked List</li>
                    <li>Find the Duplicate Number</li>
                    <li>Circular Array Loop</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* BFS/DFS Patterns */}
        <TabsContent value="bfs-dfs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>BFS/DFS Patterns</CardTitle>
              <CardDescription>
                Fundamental traversal techniques for exploring trees, graphs, and other complex data structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">What Is It?</h3>
                  <p>
                    Breadth-First Search (BFS) and Depth-First Search (DFS) are two fundamental graph traversal algorithms. 
                    BFS explores all neighbors at the current depth before moving to nodes at the next depth level, 
                    while DFS explores as far as possible along each branch before backtracking.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">When To Use It</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Traversing trees, graphs, or matrix-based problems</li>
                    <li>Finding shortest paths (BFS) or exploring all possibilities (DFS)</li>
                    <li>Solving puzzles or games with state transitions</li>
                    <li>Detecting cycles in graphs</li>
                    <li>Topological sorting (DFS)</li>
                    <li>Connected components or islands problems</li>
                  </ul>
                </div>
                
                <DiagramBox 
                  title="BFS vs DFS Visualization"
                  diagram={`
Tree Structure:
       1
     /   \\
    2     3
   / \\   / \\
  4   5 6   7

BFS Traversal Order:
Level 0: 1
Level 1: 2, 3
Level 2: 4, 5, 6, 7
Visits: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

DFS Traversal Order (Preorder):
Visits left subtree completely before right subtree
Visits: 1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7
`}
                />
                
                <div>
                  <h3 className="font-medium mb-2">Variations</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold">Breadth-First Search (BFS)</h4>
                      <p className="text-sm">Explores all neighbors at the current depth before moving to nodes at the next depth level.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Shortest Path, Level Order Traversal, Word Ladder</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Depth-First Search (DFS)</h4>
                      <p className="text-sm">Explores as far as possible along each branch before backtracking.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Path Finding, Cycle Detection, Topological Sort, Island Problems</div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold">Bidirectional BFS</h4>
                      <p className="text-sm">Runs two BFS searches simultaneously from start and goal to find the shortest path more efficiently.</p>
                      <div className="mt-1 text-sm text-muted-foreground">Example problems: Word Ladder, Shortest Path in Undirected Graph</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: BFS for Level Order Traversal</h3>
                  <CodeBlock 
                    language="python"
                    code={`from collections import deque

class TreeNode:
    def __init__(self, value=0, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def level_order_traversal(root):
    """
    Perform level order traversal on a binary tree using BFS.
    
    Time Complexity: O(n) where n is the number of nodes
    Space Complexity: O(n)
    """
    # Edge case: empty tree
    if not root:
        return []
        
    result = []
    queue = deque([root])
    
    while queue:
        # Get the number of nodes at current level
        level_size = len(queue)
        level_nodes = []
        
        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.popleft()
            level_nodes.append(node.value)
            
            # Add children to the queue for next level processing
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
                
        # Add current level's nodes to result
        result.append(level_nodes)
        
    return result

# Example usage
# Create a binary tree:
#        1
#       / \\
#      2   3
#     / \\ / \\
#    4  5 6  7
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
root.right.left = TreeNode(6)
root.right.right = TreeNode(7)

result = level_order_traversal(root)
print("Level order traversal:")
for i, level in enumerate(result):
    print(f"Level {i}: {level}")

# Output:
# Level 0: [1]
# Level 1: [2, 3]
# Level 2: [4, 5, 6, 7]`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Implementation Example: DFS for Island Count</h3>
                  <CodeBlock 
                    language="python"
                    code={`def count_islands(grid):
    """
    Count the number of islands in a 2D grid using DFS.
    An island is formed by connecting adjacent lands horizontally or vertically.
    
    Time Complexity: O(m*n) where m is number of rows, n is number of columns
    Space Complexity: O(m*n) in worst case due to recursion stack
    """
    if not grid or not grid[0]:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        # Base case: out of bounds or water or visited (marked as '0')
        if (r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0'):
            return
            
        # Mark current cell as visited
        grid[r][c] = '0'
        
        # Explore all 4 directions
        dfs(r + 1, c)  # down
        dfs(r - 1, c)  # up
        dfs(r, c + 1)  # right
        dfs(r, c - 1)  # left
    
    # Iterate through each cell in the grid
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                # Found an unvisited land, start DFS and count as a new island
                count += 1
                dfs(r, c)
                
    return count

# Example usage
grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
]

result = count_islands(grid)
print(f"Number of islands: {result}")  # Output: 3`}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Common Problems</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Binary Tree Level Order Traversal</li>
                    <li>Number of Islands</li>
                    <li>Word Ladder</li>
                    <li>Course Schedule (Topological Sort)</li>
                    <li>Clone Graph</li>
                    <li>Walls and Gates</li>
                    <li>Pacific Atlantic Water Flow</li>
                    <li>Word Search</li>
                    <li>Flood Fill</li>
                    <li>Minimum Depth of Binary Tree</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 