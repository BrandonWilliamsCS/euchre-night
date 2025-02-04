using System.Collections;
using System.Diagnostics.CodeAnalysis;

namespace BrandonWilliamsCs.EuchreNight.Domain.Common;

/// <summary>
/// Maintains an immutable dictionary structure with value semantics.
/// </summary>
/// <param name="copyFrom">Provides the values to keep in the dictionary</param>
public class ValueMap<TKey, TValue>(IEnumerable<KeyValuePair<TKey, TValue>> copyFrom)
   : IReadOnlyDictionary<TKey, TValue> where TKey : IComparable<TKey>
{
  public static readonly ValueMap<TKey, TValue> Empty = new([]);

  private readonly IReadOnlyDictionary<TKey, TValue> inner = copyFrom.ToDictionary();

  public TValue this[TKey key] => inner[key];

  public IEnumerable<TKey> Keys => inner.Keys;

  public IEnumerable<TValue> Values => inner.Values;

  public IEnumerable<KeyValuePair<TKey, TValue>> OrderedPairs => inner.OrderBy(pair => pair.Key);

  public int Count => inner.Count;

  #region Read

  public bool ContainsKey(TKey key) => inner.ContainsKey(key);

  public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator() => inner.GetEnumerator();

  public bool TryGetValue(TKey key, [MaybeNullWhen(false)] out TValue value) => inner.TryGetValue(key, out value);

  IEnumerator IEnumerable.GetEnumerator() => inner.GetEnumerator();
  #endregion

  #region Adjust
  public ValueMap<TKey, TValue> Set(TKey key, TValue value) => new(inner.Where(x => !x.Key.Equals(key)).Append(new(key, value)));
  #endregion

  #region IEquatable

  public bool Equals(ValueMap<TKey, TValue> other)
  {
    if (this.inner == other.inner) return true;
    if (this.inner.Count != other.inner.Count) return false;
    return OrderedPairs.SequenceEqual(other.OrderedPairs);
  }

  public override bool Equals(object? obj) => obj is ValueMap<TKey, TValue> other && Equals(other);

  public static bool operator ==(ValueMap<TKey, TValue>? left, ValueMap<TKey, TValue>? right) => left is null ? right is null : right is not null && left.Equals(right);

  public static bool operator !=(ValueMap<TKey, TValue>? left, ValueMap<TKey, TValue>? right) => !(left == right);

  public override int GetHashCode()
  {
    unchecked
    {
      // Found this on SO; I wonder if there's a more official implementation
      return OrderedPairs.Aggregate(19, (h, i) => h * 19 + i.Key.GetHashCode() + (i.Value?.GetHashCode() ?? 0));
    }
  }

  #endregion
}