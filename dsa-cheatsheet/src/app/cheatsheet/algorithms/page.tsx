"use client"

import { DiagramBox } from "@/components/DiagramBox"
import { CodeBlock } from "@/components/CodeBlock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHashNavigation } from "@/lib/use-hash-navigation"

export default function AlgorithmsPage() {
  const { activeTab, setActiveTab } = useHashNavigation("sorting")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Algorithms</h1>
        <p className="text-muted-foreground">
          Essential algorithms, implementations, and complexities for coding interviews.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center justify-start">
          <TabsTrigger value="sorting">Sorting</TabsTrigger>
          <TabsTrigger value="searching">Searching</TabsTrigger>
          <TabsTrigger value="recursion">Recursion</TabsTrigger>
          <TabsTrigger value="dynamic-programming">Dynamic Programming</TabsTrigger>
          <TabsTrigger value="graph-traversals">Graph Traversals</TabsTrigger>
        </TabsList>
        
        {/* Sorting Algorithms */}
        <TabsContent value="sorting" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sorting Algorithms</CardTitle>
              <CardDescription>
                Arranging data in a particular order (usually ascending or descending)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bubble-sort">
                <TabsList className="flex flex-wrap items-center justify-start">
                  <TabsTrigger value="bubble-sort">Bubble Sort</TabsTrigger>
                  <TabsTrigger value="insertion-sort">Insertion Sort</TabsTrigger>
                  <TabsTrigger value="selection-sort">Selection Sort</TabsTrigger>
                  <TabsTrigger value="merge-sort">Merge Sort</TabsTrigger>
                  <TabsTrigger value="quick-sort">Quick Sort</TabsTrigger>
                </TabsList>
                
                {/* Bubble Sort */}
                <TabsContent value="bubble-sort" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Bubble Sort</h3>
                      <p>A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n²)</span></div>
                      <div>Space: <span className="font-medium">O(1)</span></div>
                      <div>Stable: <span className="font-medium">Yes</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start at the beginning of the array</li>
                      <li>Compare each pair of adjacent elements</li>
                      <li>If they are in the wrong order, swap them</li>
                      <li>Continue to the end of the array</li>
                      <li>Repeat steps 1-4 until no more swaps are needed</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Bubble Sort Visualization"
                    diagram={`
First Pass:
( 5 1 4 2 8 ) → ( 1 5 4 2 8 )   - Compare 5 > 1, swap
( 1 5 4 2 8 ) → ( 1 4 5 2 8 )   - Compare 5 > 4, swap
( 1 4 5 2 8 ) → ( 1 4 2 5 8 )   - Compare 5 > 2, swap
( 1 4 2 5 8 ) → ( 1 4 2 5 8 )   - Compare 5 < 8, no swap

Second Pass:
( 1 4 2 5 8 ) → ( 1 4 2 5 8 )   - Compare 1 < 4, no swap
( 1 4 2 5 8 ) → ( 1 2 4 5 8 )   - Compare 4 > 2, swap
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )   - Compare 4 < 5, no swap
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )   - Compare 5 < 8, no swap

Third Pass:
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )   - No swaps needed, array is sorted!
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def bubble_sort(arr):
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        # Flag to optimize if no swaps occur
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        
        # If no swapping occurred in this pass, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print(sorted_arr)  # [11, 12, 22, 25, 34, 64, 90]`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Simple to understand and implement</li>
                          <li>Works well with small datasets</li>
                          <li>Stable sorting algorithm</li>
                          <li>In-place sorting (O(1) extra space)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Very inefficient for large lists (O(n²))</li>
                          <li>Much slower than other O(n²) algorithms</li>
                          <li>Does not adapt to the existing order of elements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Insertion Sort */}
                <TabsContent value="insertion-sort" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Insertion Sort</h3>
                      <p>A simple sorting algorithm that builds the final sorted array one item at a time, similar to how we sort playing cards in our hands.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n²)</span></div>
                      <div>Space: <span className="font-medium">O(1)</span></div>
                      <div>Stable: <span className="font-medium">Yes</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start with the second element (assume the first element is already sorted)</li>
                      <li>Compare the current element with the previous elements</li>
                      <li>If the previous element is greater, move it one position ahead</li>
                      <li>Continue moving previous elements until finding the correct position for the current element</li>
                      <li>Insert the current element in its correct position</li>
                      <li>Repeat steps 2-5 for all elements in the array</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Insertion Sort Visualization"
                    diagram={`
Initial array: [5, 2, 4, 6, 1, 3]

Pass 1: Consider element at index 1 (value 2)
[5, 2, 4, 6, 1, 3] → [2, 5, 4, 6, 1, 3]
 ^  ^
 |  |
 Compare 5 > 2, shift 5 right and insert 2

Pass 2: Consider element at index 2 (value 4)
[2, 5, 4, 6, 1, 3] → [2, 4, 5, 6, 1, 3]
    ^  ^
    |  |
    Compare 5 > 4, shift 5 right and insert 4

Pass 3: Consider element at index 3 (value 6)
[2, 4, 5, 6, 1, 3] → [2, 4, 5, 6, 1, 3]
       ^  ^
       |  |
       Compare 5 < 6, keep 6 in place

Pass 4: Consider element at index 4 (value 1)
[2, 4, 5, 6, 1, 3] → [1, 2, 4, 5, 6, 3]
          ^  ^
          |  |
          Compare and shift until 1 is in correct position

Pass 5: Consider element at index 5 (value 3)
[1, 2, 4, 5, 6, 3] → [1, 2, 3, 4, 5, 6]
             ^  ^
             |  |
             Compare and shift until 3 is in correct position

Final sorted array: [1, 2, 3, 4, 5, 6]
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def insertion_sort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        
        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    
    return arr

# Example usage
arr = [5, 2, 4, 6, 1, 3]
sorted_arr = insertion_sort(arr)
print(sorted_arr)  # [1, 2, 3, 4, 5, 6]`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Simple implementation</li>
                          <li>Efficient for small data sets</li>
                          <li>More efficient than bubble sort</li>
                          <li>Adaptive (performs well for partially sorted arrays)</li>
                          <li>Stable sorting algorithm</li>
                          <li>In-place sorting (O(1) extra space)</li>
                          <li>Online algorithm (can sort as data arrives)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Inefficient for large data sets (O(n²))</li>
                          <li>Much slower than advanced algorithms like quicksort, heapsort, or merge sort</li>
                          <li>Requires many element shifts in worst case</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Selection Sort */}
                <TabsContent value="selection-sort" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Selection Sort</h3>
                      <p>A simple comparison-based sorting algorithm that divides the input into a sorted and an unsorted region, repeatedly selecting the smallest element from the unsorted region and moving it to the sorted region.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n²)</span></div>
                      <div>Space: <span className="font-medium">O(1)</span></div>
                      <div>Stable: <span className="font-medium">No</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Find the minimum element in the unsorted array</li>
                      <li>Swap it with the first element of the unsorted part</li>
                      <li>Move the boundary between the sorted and unsorted regions one element to the right</li>
                      <li>Repeat until the entire array is sorted</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Selection Sort Visualization"
                    diagram={`
Initial array: [64, 25, 12, 22, 11]

Pass 1: Find minimum in positions 0-4
[64, 25, 12, 22, 11] → [11, 25, 12, 22, 64]
 ^           ^
 |           |
 Position   Minimum found (11), swap with first element

Pass 2: Find minimum in positions 1-4
[11, 25, 12, 22, 64] → [11, 12, 25, 22, 64]
     ^   ^
     |   |
     Position   Minimum found (12), swap with second element

Pass 3: Find minimum in positions 2-4
[11, 12, 25, 22, 64] → [11, 12, 22, 25, 64]
         ^  ^
         |  |
         Position   Minimum found (22), swap with third element

Pass 4: Find minimum in positions 3-4
[11, 12, 22, 25, 64] → [11, 12, 22, 25, 64]
             ^  ^
             |  |
             Position   Minimum found (25), already in position

Final sorted array: [11, 12, 22, 25, 64]
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def selection_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
arr = [64, 25, 12, 22, 11]
sorted_arr = selection_sort(arr)
print(sorted_arr)  # [11, 12, 22, 25, 64]`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Simple implementation</li>
                          <li>In-place sorting (O(1) extra space)</li>
                          <li>Performs well on small arrays</li>
                          <li>Minimizes the number of swaps (O(n) swaps)</li>
                          <li>Works well when memory write is costly</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Inefficient for large lists (O(n²))</li>
                          <li>Does not adapt to the data (performs the same regardless of initial order)</li>
                          <li>Not stable (may change the relative order of equal elements)</li>
                          <li>Generally performs worse than insertion sort</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Merge Sort */}
                <TabsContent value="merge-sort" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Merge Sort</h3>
                      <p>An efficient, stable, comparison-based, divide and conquer sorting algorithm that produces a sorted array by recursively dividing the input array into halves, sorting them, and merging the sorted halves.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n log n)</span></div>
                      <div>Space: <span className="font-medium">O(n)</span></div>
                      <div>Stable: <span className="font-medium">Yes</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Divide the unsorted array into n subarrays, each containing one element (a single-element array is considered sorted)</li>
                      <li>Repeatedly merge subarrays to produce new sorted subarrays until there is only one subarray remaining</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Merge Sort Visualization"
                    diagram={`
Original array: [38, 27, 43, 3, 9, 82, 10]

Divide Phase:
[38, 27, 43, 3, 9, 82, 10]
          /                \\
[38, 27, 43, 3]      [9, 82, 10]
     /      \\            /     \\
[38, 27]   [43, 3]    [9]    [82, 10]
  /   \\     /   \\            /    \\
[38] [27] [43] [3]         [82]   [10]

Conquer Phase (Merge):
[38] [27] → [27, 38]
[43] [3]  → [3, 43]
                → [3, 27, 38, 43]
[9] [82, 10] → [9] [10, 82]
                → [9, 10, 82]
                      → [3, 9, 10, 27, 38, 43, 82]
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def merge_sort(arr):
    # Base case: a list of 0 or 1 element is already sorted
    if len(arr) <= 1:
        return arr
    
    # Recursive case: divide the list into two halves
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left_half, right_half)

def merge(left, right):
    result = []
    i = j = 0
    
    # Compare elements from both lists and take the smaller one
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add any remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example usage
arr = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = merge_sort(arr)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Guaranteed O(n log n) time complexity</li>
                          <li>Stable sorting algorithm</li>
                          <li>Works well for linked lists (O(1) extra space)</li>
                          <li>Predictable performance (always O(n log n))</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Requires O(n) extra space for arrays</li>
                          <li>Relatively complex implementation</li>
                          <li>Slower for small datasets vs. insertion sort</li>
                          <li>Not an in-place sorting algorithm</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Quick Sort */}
                <TabsContent value="quick-sort" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Quick Sort</h3>
                      <p>An efficient, divide-and-conquer sorting algorithm that selects a 'pivot' element and partitions the array around the pivot, recursively sorting the subarrays.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n log n) average, O(n²) worst</span></div>
                      <div>Space: <span className="font-medium">O(log n)</span></div>
                      <div>Stable: <span className="font-medium">No</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Select a pivot element from the array</li>
                      <li>Partition the array: reorder it so that elements smaller than the pivot come before it, and elements greater than the pivot come after it</li>
                      <li>After partitioning, the pivot is in its final sorted position</li>
                      <li>Recursively apply the above steps to the sub-arrays formed on the left and right of the pivot</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Quick Sort Visualization"
                    diagram={`
Original array: [10, 7, 8, 9, 1, 5]
Choose last element as pivot: 5

First Partition:
[10, 7, 8, 9, 1, 5] → [1, | 5 | 10, 7, 8, 9]
                  ^
                  |
                 Pivot
After rearranging elements around pivot:
[1, | 5 | 10, 7, 8, 9]
    |
  Pivot in final position

Recursively sort left subarray [1]:
Already sorted (single element)

Recursively sort right subarray [10, 7, 8, 9]:
Choose last element as pivot: 9
[10, 7, 8, 9] → [7, 8, | 9 | 10]

Continue recursively for remaining subarrays:
[7, 8] → [7, 8]
[10] → [10]

Final sorted array: [1, 5, 7, 8, 9, 10]
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Helper function to perform the partition
    def partition(arr, low, high):
        # Choose the rightmost element as pivot
        pivot = arr[high]
        
        # Pointer for greater element
        i = low - 1
        
        # Compare each element with pivot
        for j in range(low, high):
            if arr[j] <= pivot:
                # If element smaller than pivot is found, swap it with the greater element
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        
        # Swap the pivot element with the greater element at i
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        
        # Return the position where partition is done
        return i + 1
    
    # Function to implement quick sort
    def quick_sort_helper(arr, low, high):
        if low < high:
            # Find pivot element such that
            # elements smaller than pivot are on the left
            # elements greater than pivot are on the right
            pi = partition(arr, low, high)
            
            # Recursively sort elements before and after partition
            quick_sort_helper(arr, low, pi - 1)
            quick_sort_helper(arr, pi + 1, high)
    
    # Make a copy of the array to avoid modifying the original
    result = arr.copy()
    # Call the helper function
    quick_sort_helper(result, 0, len(result) - 1)
    return result

# Example usage
arr = [10, 7, 8, 9, 1, 5]
sorted_arr = quick_sort(arr)
print(sorted_arr)  # [1, 5, 7, 8, 9, 10]`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Very efficient on average (O(n log n))</li>
                          <li>In-place sorting (requires small additional space)</li>
                          <li>Cache friendly (good locality of reference)</li>
                          <li>Tail-recursive, can be optimized</li>
                          <li>Often faster in practice than other O(n log n) algorithms</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Worst-case time complexity is O(n²)</li>
                          <li>Not stable (may change the relative order of equal elements)</li>
                          <li>Performance depends on pivot selection</li>
                          <li>Less efficient for nearly sorted arrays without good pivot</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Searching Algorithms */}
        <TabsContent value="searching" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Searching Algorithms</CardTitle>
              <CardDescription>
                Locating specific elements within data structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="linear-search">
                <TabsList className="flex flex-wrap items-center justify-start">
                  <TabsTrigger value="linear-search">Linear Search</TabsTrigger>
                  <TabsTrigger value="binary-search">Binary Search</TabsTrigger>
                  <TabsTrigger value="depth-first">Depth-First Search</TabsTrigger>
                  <TabsTrigger value="breadth-first">Breadth-First Search</TabsTrigger>
                </TabsList>
                
                {/* Linear Search */}
                <TabsContent value="linear-search" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Linear Search</h3>
                      <p>A sequential search algorithm that checks each element in a list until the target element is found or the list ends.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n)</span></div>
                      <div>Space: <span className="font-medium">O(1)</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start from the first element of the array</li>
                      <li>Compare each element with the target value</li>
                      <li>If the element matches the target, return its index</li>
                      <li>If the element doesn't match, move to the next element</li>
                      <li>If the end of the array is reached without finding the target, return -1 or indicate failure</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Linear Search Visualization"
                    diagram={`
Array: [5, 9, 3, 7, 2, 8, 1, 6]
Target: 7

Step 1: Check 5 == 7? No, continue
Step 2: Check 9 == 7? No, continue
Step 3: Check 3 == 7? No, continue
Step 4: Check 7 == 7? Yes, return index 3

[5, 9, 3, 7, 2, 8, 1, 6]
 ^  ^  ^  ^
 |  |  |  |
 1  2  3  4
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def linear_search(arr, target):
    """
    Linear search implementation that returns the index of the target
    or -1 if the target is not found.
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
arr = [5, 9, 3, 7, 2, 8, 1, 6]
target = 7
result = linear_search(arr, target)
print(f"Element found at index: {result}")  # Element found at index: 3`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Simple to implement</li>
                          <li>Works on unsorted arrays</li>
                          <li>No preprocessing required</li>
                          <li>Works well for small datasets</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Inefficient for large datasets (O(n))</li>
                          <li>Slower than binary search for sorted arrays</li>
                          <li>Must check every element in worst case</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Binary Search */}
                <TabsContent value="binary-search" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Binary Search</h3>
                      <p>An efficient divide-and-conquer search algorithm that finds the position of a target value within a sorted array.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(log n)</span></div>
                      <div>Space: <span className="font-medium">O(1) iterative, O(log n) recursive</span></div>
                      <div>Requires: <span className="font-medium">Sorted array</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Compare the target value to the middle element of the array</li>
                      <li>If they match, return the middle element's index</li>
                      <li>If the target is less than the middle element, search the left half</li>
                      <li>If the target is greater than the middle element, search the right half</li>
                      <li>Repeat until the target is found or the subarray becomes empty</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="Binary Search Visualization"
                    diagram={`
Array: [1, 3, 5, 7, 9, 11, 13, 15]
Target: 7

Step 1: mid = (0 + 7) // 2 = 3, arr[3] = 7
        Target found at index 3!

If target was 11:
Step 1: mid = (0 + 7) // 2 = 3, arr[3] = 7
        7 < 11, so search right half: [9, 11, 13, 15]
Step 2: mid = (4 + 7) // 2 = 5, arr[5] = 11
        Target found at index 5!

[1, 3, 5, 7, 9, 11, 13, 15]
         ^     ^
         |     |
     Compare  Move right
     (7<11)   
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def binary_search(arr, target):
    """
    Binary search implementation that returns the index of the target
    or -1 if the target is not found.
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Check if target is at mid
        if arr[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
            
        # If target is smaller, ignore right half
        else:
            right = mid - 1
            
    # Element not present
    return -1

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7
result = binary_search(arr, target)
print(f"Element found at index: {result}")  # Element found at index: 3`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recursive Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def binary_search_recursive(arr, target, left, right):
    """
    Recursive binary search implementation that returns the index of the target
    or -1 if the target is not found.
    """
    # Base case: element not found
    if left > right:
        return -1
        
    mid = (left + right) // 2
    
    # Check if target is at mid
    if arr[mid] == target:
        return mid
    
    # If target is smaller, search left half
    elif arr[mid] > target:
        return binary_search_recursive(arr, target, left, mid - 1)
        
    # If target is larger, search right half
    else:
        return binary_search_recursive(arr, target, mid + 1, right)

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13, 15]
target = 11
result = binary_search_recursive(arr, target, 0, len(arr) - 1)
print(f"Element found at index: {result}")  # Element found at index: 5`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Very efficient for large datasets (O(log n))</li>
                          <li>Faster than linear search for sorted arrays</li>
                          <li>Well-suited for large datasets that don't fit in memory</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Requires a sorted array</li>
                          <li>Sorting may add overhead if array changes frequently</li>
                          <li>Not efficient for small datasets compared to linear search</li>
                          <li>Works only on arrays that support random access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Depth-First Search */}
                <TabsContent value="depth-first" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Depth-First Search (DFS)</h3>
                      <p>A graph traversal algorithm that explores as far as possible along each branch before backtracking, often implemented using recursion or a stack.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(V + E)</span></div>
                      <div>Space: <span className="font-medium">O(V)</span></div>
                      <div>V = vertices, E = edges</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start at a source vertex</li>
                      <li>Mark the current vertex as visited</li>
                      <li>Recursively visit each unvisited adjacent vertex</li>
                      <li>Backtrack when all adjacent vertices have been visited</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="DFS Visualization"
                    diagram={`
Graph:
    A --- B
    |     |
    |     |
    C --- D
    |
    |
    E --- F

DFS starting from A:
1. Visit A, mark as visited
2. Visit B (A's neighbor), mark as visited
3. Visit D (B's neighbor), mark as visited
4. Visit C (D's neighbor), mark as visited
5. Visit E (C's neighbor), mark as visited
6. Visit F (E's neighbor), mark as visited

DFS Traversal Order: A → B → D → C → E → F
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation (Recursive)</h4>
                    <CodeBlock 
                      language="python"
                      code={`def dfs_recursive(graph, vertex, visited=None):
    # Initialize visited set on first call
    if visited is None:
        visited = set()
    
    # Mark the current vertex as visited
    visited.add(vertex)
    print(vertex, end=' ')
    
    # Recur for all adjacent vertices
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D', 'E'],
    'D': ['B', 'C'],
    'E': ['C', 'F'],
    'F': ['E']
}

print("DFS traversal starting from vertex 'A':")
dfs_recursive(graph, 'A')  # Output: A B D C E F`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation (Iterative)</h4>
                    <CodeBlock 
                      language="python"
                      code={`def dfs_iterative(graph, start):
    # Create a stack for DFS and a set to track visited vertices
    stack = [start]
    visited = set()
    
    while stack:
        # Pop a vertex from the stack
        vertex = stack.pop()
        
        # If not visited, mark it and process it
        if vertex not in visited:
            print(vertex, end=' ')
            visited.add(vertex)
            
            # Add all adjacent vertices to the stack
            # Add in reverse order to get the same traversal as recursive method
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D', 'E'],
    'D': ['B', 'C'],
    'E': ['C', 'F'],
    'F': ['E']
}

print("DFS traversal starting from vertex 'A':")
dfs_iterative(graph, 'A')  # Output: A C E F D B`}
                    />
                  </div>
                </TabsContent>
                
                {/* Breadth-First Search */}
                <TabsContent value="breadth-first" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Breadth-First Search (BFS)</h3>
                      <p>A graph traversal algorithm that explores all neighbors at the present depth before moving to vertices at the next depth level, typically implemented using a queue.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(V + E)</span></div>
                      <div>Space: <span className="font-medium">O(V)</span></div>
                      <div>V = vertices, E = edges</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start at the source vertex and mark it as visited</li>
                      <li>Add the source vertex to a queue</li>
                      <li>While the queue is not empty, dequeue a vertex</li>
                      <li>Visit all unvisited neighbors, mark them as visited, and enqueue them</li>
                      <li>Repeat until the queue is empty</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="BFS Visualization"
                    diagram={`
Graph:
    A --- B
   / \\     \\
  /   \\     \\
 C --- D --- E
  \\
   \\
    F

BFS starting from A:
Step 1: Visit A, add to queue
        Queue: [A]
Step 2: Dequeue A, visit and enqueue all neighbors (B, C)
        Queue: [B, C]
Step 3: Dequeue B, visit and enqueue all unvisited neighbors (E)
        Queue: [C, E]
Step 4: Dequeue C, visit and enqueue all unvisited neighbors (D, F)
        Queue: [E, D, F]
Step 5: Dequeue E (no unvisited neighbors)
        Queue: [D, F]
Step 6: Dequeue D (no unvisited neighbors)
        Queue: [F]
Step 7: Dequeue F (no unvisited neighbors)
        Queue: []

BFS Traversal Order: A → B → C → E → D → F
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`from collections import deque

def bfs(graph, start):
    # Create a queue for BFS
    queue = deque([start])
    
    # Set to keep track of visited vertices
    visited = {start}
    
    # List to store traversal order
    traversal = []
    
    while queue:
        # Dequeue a vertex from the queue
        vertex = queue.popleft()
        traversal.append(vertex)
        
        # Visit all adjacent unvisited vertices
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return traversal

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'E'],
    'C': ['A', 'D', 'F'],
    'D': ['C', 'E'],
    'E': ['B', 'D'],
    'F': ['C']
}

result = bfs(graph, 'A')
print("BFS traversal starting from vertex 'A':")
print(' → '.join(result))  # Output: A → B → C → E → D → F`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Shortest Path using BFS</h4>
                    <CodeBlock 
                      language="python"
                      code={`from collections import deque

def shortest_path_bfs(graph, start, end):
    # Handle case when start and end are the same
    if start == end:
        return [start]
    
    # Queue to store paths
    queue = deque([[start]])
    
    # Set to keep track of visited vertices
    visited = {start}
    
    while queue:
        # Get the first path from queue
        path = queue.popleft()
        
        # Get the last node in the path
        vertex = path[-1]
        
        # Check all adjacent vertices
        for neighbor in graph[vertex]:
            # If neighbor hasn't been visited
            if neighbor not in visited:
                # Create a new path by appending the neighbor
                new_path = list(path)
                new_path.append(neighbor)
                
                # If neighbor is the destination, return the path
                if neighbor == end:
                    return new_path
                
                # Mark neighbor as visited and enqueue the new path
                visited.add(neighbor)
                queue.append(new_path)
    
    # If no path exists
    return None

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'E'],
    'C': ['A', 'D', 'F'],
    'D': ['C', 'E'],
    'E': ['B', 'D'],
    'F': ['C']
}

path = shortest_path_bfs(graph, 'A', 'F')
if path:
    print(f"Shortest path from A to F: {' → '.join(path)}")  # Output: A → C → F
else:
    print("No path exists")`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Applications of BFS</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Finding shortest paths in unweighted graphs</li>
                      <li>Web crawlers</li>
                      <li>Social networking (finding friends within a certain distance)</li>
                      <li>GPS navigation systems</li>
                      <li>Broadcasting in networks</li>
                      <li>Garbage collection in programming languages</li>
                      <li>Finding all nodes within one connected component</li>
                      <li>Testing bipartiteness of a graph</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Guaranteed to find the shortest path in unweighted graphs</li>
                          <li>Efficient for graphs where solutions are close to the source</li>
                          <li>Better than DFS for finding the shortest path</li>
                          <li>More systematic than DFS for searching a graph</li>
                          <li>Good for level-by-level traversal</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Uses more memory than DFS for deep graphs</li>
                          <li>Not suitable for decision trees or game trees</li>
                          <li>Inefficient for weighted graphs (Dijkstra's algorithm is better)</li>
                          <li>Can be slow for very large graphs with many branches</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Other searching algorithms would go here */}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recursion */}
        <TabsContent value="recursion" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recursion</CardTitle>
              <CardDescription>
                A programming technique where a function calls itself to solve a problem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basics">
                <TabsList className="flex flex-wrap items-center justify-start">
                  <TabsTrigger value="basics">Basics of Recursion</TabsTrigger>
                  <TabsTrigger value="factorial">Factorial</TabsTrigger>
                  <TabsTrigger value="fibonacci">Fibonacci</TabsTrigger>
                </TabsList>
                
                {/* Basics of Recursion */}
                <TabsContent value="basics" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Understanding Recursion</h3>
                      <p>Recursion is when a function calls itself directly or indirectly to solve a smaller instance of the same problem.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Components</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Base Case:</strong> The condition that stops the recursion</li>
                      <li><strong>Recursive Case:</strong> The part where the function calls itself</li>
                      <li><strong>State:</strong> Parameters that change with each recursive call</li>
                    </ul>
                  </div>
                  
                  <DiagramBox 
                    title="Recursion Structure"
                    diagram={`
function recursiveFunction(parameters) {
    // Base case: condition to stop recursion
    if (baseCondition) {
        return value;
    }
    
    // Recursive case: calling the function with modified parameters
    return recursiveFunction(modifiedParameters);
}
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Call Stack Visualization</h4>
                    <DiagramBox 
                      title="Call Stack for factorial(3)"
                      diagram={`
factorial(3)
  └── return 3 * factorial(2)
       └── return 2 * factorial(1)
            └── return 1 * factorial(0)
                 └── return 1
            └── return 1 * 1 = 1
       └── return 2 * 1 = 2
  └── return 3 * 2 = 6
`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recursion vs. Iteration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Recursion</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>More elegant and readable for some problems</li>
                          <li>Uses call stack (memory overhead)</li>
                          <li>Can lead to stack overflow for deep recursion</li>
                          <li>Natural for tree/graph traversal and divide-and-conquer</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Iteration</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Usually more efficient in terms of memory</li>
                          <li>Doesn't risk stack overflow</li>
                          <li>Sometimes more complex to implement</li>
                          <li>Better for simple loops and repetitive tasks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Factorial Example */}
                <TabsContent value="factorial" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Factorial Example</h3>
                      <p>Computing the factorial of a number (n!) using recursion.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n)</span></div>
                      <div>Space: <span className="font-medium">O(n)</span> call stack</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mathematical Definition</h4>
                    <div className="text-sm">
                      <p>n! = n × (n-1) × (n-2) × ... × 2 × 1</p>
                      <p>0! = 1 (by definition)</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

# Example usage
result = factorial(5)
print(f"Factorial of 5 is: {result}")  # Output: 120`}
                    />
                  </div>
                  
                  <DiagramBox 
                    title="Execution of factorial(5)"
                    diagram={`
factorial(5)
= 5 * factorial(4)
= 5 * (4 * factorial(3))
= 5 * (4 * (3 * factorial(2)))
= 5 * (4 * (3 * (2 * factorial(1))))
= 5 * (4 * (3 * (2 * 1)))
= 5 * (4 * (3 * 2))
= 5 * (4 * 6)
= 5 * 24
= 120
`}
                  />
                </TabsContent>
                
                {/* Fibonacci Example */}
                <TabsContent value="fibonacci" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Fibonacci Example</h3>
                      <p>Computing the nth Fibonacci number using recursion.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(2^n)</span> naive recursion</div>
                      <div>Space: <span className="font-medium">O(n)</span> call stack</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mathematical Definition</h4>
                    <div className="text-sm">
                      <p>Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...</p>
                      <p>F(0) = 0</p>
                      <p>F(1) = 1</p>
                      <p>F(n) = F(n-1) + F(n-2) for n {`>`} 1</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Naive Recursive Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage
result = fibonacci(6)
print(f"The 6th Fibonacci number is: {result}")  # Output: 8`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Optimized Implementation with Memoization</h4>
                    <CodeBlock 
                      language="python"
                      code={`def fibonacci_memo(n, memo={}):
    # Check if we've already calculated this value
    if n in memo:
        return memo[n]
    
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # Recursive case with memoization
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

# Example usage
result = fibonacci_memo(20)
print(f"The 20th Fibonacci number is: {result}")  # Output: 6765`}
                    />
                  </div>
                  
                  <DiagramBox 
                    title="Naive Recursion Tree for fibonacci(5)"
                    diagram={`
                  fibonacci(5)
                 /            \\
        fibonacci(4)         fibonacci(3)
       /          \\         /         \\
fibonacci(3)  fibonacci(2) fibonacci(2) fibonacci(1)
   /      \\       /    \\      /    \\
f(2)      f(1)   f(1)  f(0)   f(1)  f(0)
/ \\
f(1) f(0)

This tree shows duplicate calculations (e.g., fibonacci(3) is calculated twice),
which is why naive recursion is inefficient. Memoization solves this problem.
`}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Dynamic Programming */}
        <TabsContent value="dynamic-programming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Programming</CardTitle>
              <CardDescription>
                An optimization technique that solves complex problems by breaking them into simpler subproblems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="concept">
                <TabsList className="flex flex-wrap items-center justify-start">
                  <TabsTrigger value="concept">Concept</TabsTrigger>
                  <TabsTrigger value="fibonacci-dp">Fibonacci (DP)</TabsTrigger>
                  <TabsTrigger value="knapsack">0/1 Knapsack</TabsTrigger>
                </TabsList>
                
                {/* DP Concept */}
                <TabsContent value="concept" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Dynamic Programming Principles</h3>
                      <p>Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Two Key Properties</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li><strong>Overlapping Subproblems:</strong> The problem can be broken down into subproblems which are reused multiple times</li>
                      <li><strong>Optimal Substructure:</strong> The optimal solution to the problem can be constructed from optimal solutions of its subproblems</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Approaches to DP</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Top-Down (Memoization)</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Recursively solve the problem</li>
                          <li>Cache (memoize) results for future use</li>
                          <li>Start from the original problem</li>
                          <li>More intuitive for many problems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Bottom-Up (Tabulation)</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Iteratively build up solutions to larger problems</li>
                          <li>Start from the smallest subproblems</li>
                          <li>Store results in a table</li>
                          <li>Usually more efficient (no recursion overhead)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Common DP Problems</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Fibonacci Sequence</li>
                      <li>Longest Common Subsequence</li>
                      <li>0/1 Knapsack Problem</li>
                      <li>Coin Change Problem</li>
                      <li>Longest Increasing Subsequence</li>
                      <li>Matrix Chain Multiplication</li>
                      <li>Edit Distance</li>
                    </ul>
                  </div>
                </TabsContent>
                
                {/* Fibonacci DP */}
                <TabsContent value="fibonacci-dp" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Fibonacci with Dynamic Programming</h3>
                      <p>Computing Fibonacci numbers efficiently using DP approaches.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n)</span></div>
                      <div>Space: <span className="font-medium">O(n)</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Top-Down Approach (Memoization)</h4>
                    <CodeBlock 
                      language="python"
                      code={`def fibonacci_memo(n, memo={}):
    # Check if we've already calculated this value
    if n in memo:
        return memo[n]
    
    # Base cases
    if n <= 1:
        return n
    
    # Recursive case with memoization
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

# Example usage
result = fibonacci_memo(100)
print(f"The 100th Fibonacci number is: {result}")`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bottom-Up Approach (Tabulation)</h4>
                    <CodeBlock 
                      language="python"
                      code={`def fibonacci_tabulation(n):
    # Handle base cases
    if n <= 1:
        return n
        
    # Create a table to store results
    dp = [0] * (n + 1)
    
    # Base cases
    dp[0] = 0
    dp[1] = 1
    
    # Fill the table bottom-up
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
        
    return dp[n]

# Example usage
result = fibonacci_tabulation(100)
print(f"The 100th Fibonacci number is: {result}")`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Space-Optimized Solution</h4>
                    <CodeBlock 
                      language="python"
                      code={`def fibonacci_optimized(n):
    # Handle base cases
    if n <= 1:
        return n
        
    # Only need to keep track of the last two values
    a, b = 0, 1
    
    # Iterate to build up the solution
    for _ in range(2, n + 1):
        a, b = b, a + b
        
    return b

# Example usage
result = fibonacci_optimized(100)
print(f"The 100th Fibonacci number is: {result}")`}
                    />
                  </div>
                  
                  <DiagramBox 
                    title="Tabulation Process Visualization"
                    diagram={`
For fibonacci_tabulation(5):

Initialize dp = [0, 0, 0, 0, 0, 0]
Set base cases: dp = [0, 1, 0, 0, 0, 0]

i=2: dp[2] = dp[1] + dp[0] = 1 + 0 = 1
     dp = [0, 1, 1, 0, 0, 0]
     
i=3: dp[3] = dp[2] + dp[1] = 1 + 1 = 2
     dp = [0, 1, 1, 2, 0, 0]
     
i=4: dp[4] = dp[3] + dp[2] = 2 + 1 = 3
     dp = [0, 1, 1, 2, 3, 0]
     
i=5: dp[5] = dp[4] + dp[3] = 3 + 2 = 5
     dp = [0, 1, 1, 2, 3, 5]
     
Return dp[5] = 5
`}
                  />
                </TabsContent>
                
                {/* 0/1 Knapsack */}
                <TabsContent value="knapsack" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">0/1 Knapsack Problem</h3>
                      <p>A classic dynamic programming problem where you need to maximize value while keeping weight constraints.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(n*W)</span></div>
                      <div>Space: <span className="font-medium">O(n*W)</span></div>
                      <div>n = number of items, W = weight capacity</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Problem Statement</h4>
                    <div className="text-sm">
                      <p>Given n items with weights and values, put these items in a knapsack of capacity W to get the maximum total value. You cannot break an item; either pick the complete item or don't pick it (0/1 property).</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Dynamic Programming Solution</h4>
                    <CodeBlock 
                      language="python"
                      code={`def knapsack_01(values, weights, capacity):
    n = len(values)
    
    # Initialize a table dp[i][w] where i is the item index and w is the current weight
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    # Build the table in bottom-up manner
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            # If current item weight is <= current capacity, we have two choices:
            # 1. Include the item
            # 2. Exclude the item
            if weights[i-1] <= w:
                dp[i][w] = max(
                    values[i-1] + dp[i-1][w - weights[i-1]],  # Include item
                    dp[i-1][w]  # Exclude item
                )
            else:
                # If item's weight is more than capacity, we can't include it
                dp[i][w] = dp[i-1][w]
    
    # Return the maximum value that can be put in a knapsack of capacity W
    return dp[n][capacity]

# Example usage
values = [60, 100, 120]
weights = [10, 20, 30]
capacity = 50
result = knapsack_01(values, weights, capacity)
print(f"Maximum value in knapsack: {result}")  # Output: 220`}
                    />
                  </div>
                  
                  <DiagramBox 
                    title="0/1 Knapsack Example"
                    diagram={`
Items:
- Item 1: value = 60, weight = 10
- Item 2: value = 100, weight = 20
- Item 3: value = 120, weight = 30

Knapsack capacity (W): 50

DP Table:
   w→  0  1  2  ... 10  ... 20  ... 30  ... 40  ... 50
i↓
0      0  0  0  ...  0  ...  0  ...  0  ...  0  ...  0
1      0  0  0  ... 60  ... 60  ... 60  ... 60  ... 60
2      0  0  0  ... 60  ... 100 ... 160 ... 160 ... 160
3      0  0  0  ... 60  ... 100 ... 160 ... 180 ... 220

DP[3][50] = 220 (maximum value)

Solution: Take Item 2 (100) and Item 3 (120)
Total value: 220
Total weight: 20 + 30 = 50 (full capacity used)
`}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Graph Traversals */}
        <TabsContent value="graph-traversals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Graph Traversals</CardTitle>
              <CardDescription>
                Techniques for visiting all the vertices in a graph
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dfs">
                <TabsList className="flex flex-wrap items-center justify-start">
                  <TabsTrigger value="dfs">Depth-First Search (DFS)</TabsTrigger>
                  <TabsTrigger value="bfs">Breadth-First Search (BFS)</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>
                
                {/* DFS */}
                <TabsContent value="dfs" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Depth-First Search (DFS)</h3>
                      <p>An algorithm for traversing tree or graph data structures that explores as far as possible along each branch before backtracking.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(V + E)</span></div>
                      <div>Space: <span className="font-medium">O(V)</span></div>
                      <div>V = vertices, E = edges</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start at a source vertex</li>
                      <li>Mark the current vertex as visited</li>
                      <li>Recursively visit each unvisited adjacent vertex</li>
                      <li>Backtrack when all adjacent vertices have been visited</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="DFS Visualization"
                    diagram={`
Graph:
    A --- B
    |     |
    |     |
    C --- D
    |
    |
    E --- F

DFS starting from A:
1. Visit A, mark as visited
2. Visit B (A's neighbor), mark as visited
3. Visit D (B's neighbor), mark as visited
4. Visit C (D's neighbor), mark as visited
5. Visit E (C's neighbor), mark as visited
6. Visit F (E's neighbor), mark as visited

DFS Traversal Order: A → B → D → C → E → F
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation (Recursive)</h4>
                    <CodeBlock 
                      language="python"
                      code={`def dfs_recursive(graph, vertex, visited=None):
    # Initialize visited set on first call
    if visited is None:
        visited = set()
    
    # Mark the current vertex as visited
    visited.add(vertex)
    print(vertex, end=' ')
    
    # Recur for all adjacent vertices
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D', 'E'],
    'D': ['B', 'C'],
    'E': ['C', 'F'],
    'F': ['E']
}

print("DFS traversal starting from vertex 'A':")
dfs_recursive(graph, 'A')  # Output: A B D C E F`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation (Iterative)</h4>
                    <CodeBlock 
                      language="python"
                      code={`def dfs_iterative(graph, start):
    # Create a stack for DFS and a set to track visited vertices
    stack = [start]
    visited = set()
    
    while stack:
        # Pop a vertex from the stack
        vertex = stack.pop()
        
        # If not visited, mark it and process it
        if vertex not in visited:
            print(vertex, end=' ')
            visited.add(vertex)
            
            # Add all adjacent vertices to the stack
            # Add in reverse order to get the same traversal as recursive method
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D', 'E'],
    'D': ['B', 'C'],
    'E': ['C', 'F'],
    'F': ['E']
}

print("DFS traversal starting from vertex 'A':")
dfs_iterative(graph, 'A')  # Output: A C E F D B`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Applications of DFS</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Detecting cycles in graphs</li>
                      <li>Finding paths between two vertices</li>
                      <li>Topological sorting</li>
                      <li>Solving mazes and puzzles</li>
                      <li>Finding connected components</li>
                      <li>Finding strongly connected components</li>
                      <li>Generating minimum spanning trees</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Uses less memory than BFS for wide graphs</li>
                          <li>Will find a solution if one exists</li>
                          <li>Good for decision trees and game trees</li>
                          <li>Simple implementation using recursion</li>
                          <li>Fast for deep graphs where solutions are far from root</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>May get stuck in very deep/infinite paths</li>
                          <li>Not guaranteed to find the shortest path</li>
                          <li>Can be slower than BFS for finding shortest paths</li>
                          <li>Recursion can lead to stack overflow for very deep graphs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* BFS */}
                <TabsContent value="bfs" className="space-y-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Breadth-First Search (BFS)</h3>
                      <p>A graph traversal algorithm that explores all neighbors at the present depth before moving to vertices at the next depth level, typically implemented using a queue.</p>
                    </div>
                    <div className="bg-muted px-3 py-1 rounded text-sm">
                      <div>Time: <span className="font-medium">O(V + E)</span></div>
                      <div>Space: <span className="font-medium">O(V)</span></div>
                      <div>V = vertices, E = edges</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">How It Works</h4>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Start at the source vertex and mark it as visited</li>
                      <li>Add the source vertex to a queue</li>
                      <li>While the queue is not empty, dequeue a vertex</li>
                      <li>Visit all unvisited neighbors, mark them as visited, and enqueue them</li>
                      <li>Repeat until the queue is empty</li>
                    </ol>
                  </div>
                  
                  <DiagramBox 
                    title="BFS Visualization"
                    diagram={`
Graph:
    A --- B
   / \\     \\
  /   \\     \\
 C --- D --- E
  \\
   \\
    F

BFS starting from A:
Step 1: Visit A, add to queue
        Queue: [A]
Step 2: Dequeue A, visit and enqueue all neighbors (B, C)
        Queue: [B, C]
Step 3: Dequeue B, visit and enqueue all unvisited neighbors (E)
        Queue: [C, E]
Step 4: Dequeue C, visit and enqueue all unvisited neighbors (D, F)
        Queue: [E, D, F]
Step 5: Dequeue E (no unvisited neighbors)
        Queue: [D, F]
Step 6: Dequeue D (no unvisited neighbors)
        Queue: [F]
Step 7: Dequeue F (no unvisited neighbors)
        Queue: []

BFS Traversal Order: A → B → C → E → D → F
`}
                  />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Python Implementation</h4>
                    <CodeBlock 
                      language="python"
                      code={`from collections import deque

def bfs(graph, start):
    # Create a queue for BFS
    queue = deque([start])
    
    # Set to keep track of visited vertices
    visited = {start}
    
    # List to store traversal order
    traversal = []
    
    while queue:
        # Dequeue a vertex from the queue
        vertex = queue.popleft()
        traversal.append(vertex)
        
        # Visit all adjacent unvisited vertices
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return traversal

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'E'],
    'C': ['A', 'D', 'F'],
    'D': ['C', 'E'],
    'E': ['B', 'D'],
    'F': ['C']
}

result = bfs(graph, 'A')
print("BFS traversal starting from vertex 'A':")
print(' → '.join(result))  # Output: A → B → C → E → D → F`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Shortest Path using BFS</h4>
                    <CodeBlock 
                      language="python"
                      code={`from collections import deque

def shortest_path_bfs(graph, start, end):
    # Handle case when start and end are the same
    if start == end:
        return [start]
    
    # Queue to store paths
    queue = deque([[start]])
    
    # Set to keep track of visited vertices
    visited = {start}
    
    while queue:
        # Get the first path from queue
        path = queue.popleft()
        
        # Get the last node in the path
        vertex = path[-1]
        
        # Check all adjacent vertices
        for neighbor in graph[vertex]:
            # If neighbor hasn't been visited
            if neighbor not in visited:
                # Create a new path by appending the neighbor
                new_path = list(path)
                new_path.append(neighbor)
                
                # If neighbor is the destination, return the path
                if neighbor == end:
                    return new_path
                
                # Mark neighbor as visited and enqueue the new path
                visited.add(neighbor)
                queue.append(new_path)
    
    # If no path exists
    return None

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'E'],
    'C': ['A', 'D', 'F'],
    'D': ['C', 'E'],
    'E': ['B', 'D'],
    'F': ['C']
}

path = shortest_path_bfs(graph, 'A', 'F')
if path:
    print(f"Shortest path from A to F: {' → '.join(path)}")  # Output: A → C → F
else:
    print("No path exists")`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Applications of BFS</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Finding shortest paths in unweighted graphs</li>
                      <li>Web crawlers</li>
                      <li>Social networking (finding friends within a certain distance)</li>
                      <li>GPS navigation systems</li>
                      <li>Broadcasting in networks</li>
                      <li>Garbage collection in programming languages</li>
                      <li>Finding all nodes within one connected component</li>
                      <li>Testing bipartiteness of a graph</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pros and Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Advantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Guaranteed to find the shortest path in unweighted graphs</li>
                          <li>Efficient for graphs where solutions are close to the source</li>
                          <li>Better than DFS for finding the shortest path</li>
                          <li>More systematic than DFS for searching a graph</li>
                          <li>Good for level-by-level traversal</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Disadvantages</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Uses more memory than DFS for deep graphs</li>
                          <li>Not suitable for decision trees or game trees</li>
                          <li>Inefficient for weighted graphs (Dijkstra's algorithm is better)</li>
                          <li>Can be slow for very large graphs with many branches</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Applications */}
                <TabsContent value="applications" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Applications of Graph Traversals</h3>
                    <p>Graph traversal algorithms are fundamental to solving many important problems in computer science.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Common Applications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium mb-1">DFS Applications</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Detecting cycles in a graph</li>
                          <li>Finding connected components</li>
                          <li>Topological sorting</li>
                          <li>Solving puzzles with only one solution (maze)</li>
                          <li>Finding strongly connected components</li>
                          <li>Generating minimum spanning trees</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">BFS Applications</h5>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>Finding shortest paths (unweighted graphs)</li>
                          <li>Finding all nodes within one connected component</li>
                          <li>Testing bipartiteness of a graph</li>
                          <li>Finding the shortest path in a maze</li>
                          <li>Web crawlers</li>
                          <li>Social networking (finding friends within a certain distance)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Advanced Graph Algorithms</h4>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Dijkstra's Algorithm:</strong> Finding shortest paths in a weighted graph (non-negative weights)
                      </div>
                      <div>
                        <strong>Bellman-Ford Algorithm:</strong> Finding shortest paths with negative weights
                      </div>
                      <div>
                        <strong>Prim's Algorithm:</strong> Finding minimum spanning tree using BFS approach
                      </div>
                      <div>
                        <strong>Kruskal's Algorithm:</strong> Finding minimum spanning tree using greedy approach
                      </div>
                      <div>
                        <strong>A* Search Algorithm:</strong> Finding the shortest path using heuristics
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Real-World Examples</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>GPS Navigation:</strong> Finding shortest routes using graph traversal</li>
                      <li><strong>Social Network Analysis:</strong> Finding connections and recommendations</li>
                      <li><strong>Web Crawling:</strong> Indexing webpages using BFS</li>
                      <li><strong>Network Routing:</strong> Finding efficient paths for data packets</li>
                      <li><strong>Game Development:</strong> AI pathfinding algorithms</li>
                      <li><strong>Compiler Design:</strong> Dependency resolution using topological sort</li>
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