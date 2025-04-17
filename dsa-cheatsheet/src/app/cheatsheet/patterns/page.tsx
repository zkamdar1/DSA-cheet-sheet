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
        
        {/* Other pattern sections would go here */}
      </Tabs>
    </div>
  )
} 